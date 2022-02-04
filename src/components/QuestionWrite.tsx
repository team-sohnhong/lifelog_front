import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from "ethers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "../service";
import { address } from "../utils/ContractInfo";
import abi from "../utils/CritPortal.json";

declare var window: any;

export default function WriteQuestion(props: any) {
  const navigate = useNavigate();

  // 임시저장 로직
  const [snackbar, setSnackbar] = useState({
    open: false,
  });
  const [reward, setReward] = useState(0);
  const { open } = snackbar;
  const userAddress = useSelector(
    (state: RootState) => state.user.user.address
  );

  
  const handleSnackbaropen = () => {
    setSnackbar({ open: !open });
  };

  const handleChange = (event: any) => {
    event.preventDefault();

    setReward(event.target.value);
  };

  const postQuestion = async (question: any) => {
    try {
      const response = await apiRequest.post(`/questions`, question);
    } catch (err) {
      console.error(
        "🚀 ~ file: QuestionWrite.tsx ~ line 36 ~ postQuestion ~ response",
        err
      );
    }
  };

  // Web3 part
  const contractAddress = address;
  const contractABI = abi.abi;

  const openQuestion = async (id: string) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const critPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // await signer.sendTransaction({
        //   to: contractAddress,
        //   value: ethers.utils.parseEther("0.01"),
        //   gasPrice: 8000000000,
        // });

        let result = await critPortalContract.openQuestion(
          id,
          reward * 1000000000 * 1000000000,
          {
            value: ethers.utils.parseEther(`${reward}`),
          }
        ); // 0.01 ether
        await result.wait(); // waiting till mine complete
        let after = await critPortalContract.getQuestionById(id);

        console.log(after);

        return true;
      } else {
        console.log("Ethereum object doesn't exist!");
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 전송 및 라우트 이동 로직
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const id = uuidv4();
    const isTxSucceed = await openQuestion(id);

    if (isTxSucceed) {
      const rewardNum: number = Number(reward);

      let question = {
        id,
        title: data.get("title") as string, //textfield의 name 으로 정해놓은 걸 가져올 수 있음! value, onchage와는 다른 방식
        content: data.get("content") as string,
        owner: userAddress,
        reward: rewardNum,
      };

      await postQuestion(question);

      navigate("/");
    } else {
      console.log("Error. Fail to upload on blockchain");
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 5,
          border: 1,
          borderColor: "#888888",
          alignItems: "center",
          "& input": {
            fontSize: "22px",
          },
          "& input::placeholder": {
            //이렇게 컴포넌트의 각 속성에도 넣을 수도 있다
            fontSize: "22px",
          },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent={"flex-end"}
          sx={{
            marginTop: 8,
          }}
        >
          <Grid item mr={1}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleSnackbaropen}
            >
              Save Temporarily
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={800}
              open={open}
              onClose={handleSnackbaropen}
              key={"temporary-storage-top"}
            >
              <Alert severity="error">
                Failed to save your file temporarily!
              </Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              // disabled
            >
              Post
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid item xs={10}>
            <Box sx={{ mt: 3, alignItems: "center" }}>
              <TextField
                name="title" //이게 값 연결
                variant="standard"
                placeholder="Title"
                required
                fullWidth
                sx={{
                  my: 8,
                  color: "white",
                }}
              />

              <TextField
                name="content"
                variant="standard"
                placeholder="Write your question..."
                multiline // 멀티라인하면 fontSize가 안바뀌구나
                fullWidth
                required
                minRows={16} //이게 중요
                maxRows={16}
                InputProps={{ disableUnderline: true }}
                sx={{
                  pt: 1,
                  pl: 0,
                  borderColor: "#808080",
                  minHeight: 400,
                  color: "white",
                }}
              ></TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <p>YOUR QUESTION REWARD</p>
        <TextField
          id=""
          placeholder="eth"
          value={reward}
          onChange={handleChange}
          sx={{
            borderColor: "#808080",
          }}
        />
        eth
      </Box>
    </Container>
  );
}
