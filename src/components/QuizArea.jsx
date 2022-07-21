import React from "react";
import { useState } from "react";

import Quiz from "./Quiz";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import { useEffect } from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: "#ec7783",
	},
	"&:nth-of-type(even)": {
		backgroundColor: "#ec7783",
	},
}));

const initialState = {
	maxQues: "20",
	maxValue: "10",
	operators: ["+", "-", "*", "/"],
	quesNum: 1,
	score: 0,
	finalScore: [],
};

const QuizArea = ({ id, calculateTotalScore }) => {
	const [quizStarted, setQuizStarted] = useState(false);
	const [maxQues, setMaxQues] = useState(initialState.maxQues);
	const [maxValue, setMaxValue] = useState(initialState.maxValue);
	const [operators, setOperators] = useState(initialState.operators);
	const [quesNum, setQuesNum] = useState(initialState.quesNum);
	const [score, setScore] = useState(initialState.score);
	const [finalScore, setFinalScore] = useState(initialState.finalScore);

	useEffect(() => {
		calculateTotalScore(id, score);
	}, [score]);

	const handleClick = () => {
		setQuizStarted(!quizStarted);
	};

	const handleChange = (e) => {
		if (e.target.name === "maxQues") {
			setMaxQues(e.target.value);
		} else if (e.target.name === "maxValue") {
			setMaxValue(e.target.value);
		} else if (e.target.name === "operators") {
			setOperators(e.target.value.split(","));
		}

		console.log(e.target.value.split(","));
	};

	const handleNext = (ques, userInput, isCorrect, result) => {
		// console.log(ques, userInput, isCorrect);
		isCorrect && setScore(score + 1);

		setFinalScore([
			...finalScore,
			{
				ques,
				userInput,
				isCorrect,
				result,
			},
		]);

		setQuesNum(quesNum + 1);
	};

	const handleReset = () => {
		setQuizStarted(!quizStarted);
		setMaxQues(initialState.maxQues);
		setMaxValue(initialState.maxValue);
		setOperators(initialState.operators);
		setQuesNum(initialState.quesNum);
		setScore(initialState.score);
		setFinalScore(initialState.finalScore);
	};

	//console.log(finalScore);

	return (
		<div className='quiz-container'>
			{quizStarted ? (
				quesNum <= maxQues ? (
					<>
						<span>Score : {score}</span>
						<Quiz
							handleNext={handleNext}
							quesNum={quesNum}
							maxQues={parseInt(maxQues)}
							maxValue={parseInt(maxValue) + 1}
							operators={operators}
						/>
						<button className='btn lead' onClick={handleReset}>
							{" "}
							Reset{" "}
						</button>
						<br />
					</>
				) : (
					<>
						<h1> Final Score: {score}</h1>
						<TableContainer component={Paper}>
							<Table
								sx={{ minWidth: 400 }}
								size='small'
								aria-label='a dense table'>
								<TableHead>
									<TableRow>
										<TableCell align='center'> Question </TableCell>
										<TableCell align='center'>Your Response</TableCell>
										<TableCell align='center'>Correct Response</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{finalScore.map((row) =>
										row.isCorrect ? (
											<TableRow
												key={row.name}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}>
												<TableCell align='center'>{row.ques}</TableCell>
												<TableCell align='center'>{row.userInput}</TableCell>
												<TableCell align='center'>{row.result}</TableCell>
											</TableRow>
										) : (
											<StyledTableRow
												key={row.name}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}>
												<TableCell align='center'>{row.ques}</TableCell>
												<TableCell align='center'>{row.userInput}</TableCell>
												<TableCell align='center'>{row.result}</TableCell>
											</StyledTableRow>
										)
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<button className='btn lead' onClick={handleReset}>
							{" "}
							Restart{" "}
						</button>
					</>
				)
			) : (
				<>
					<form>
						<div className='form-group'>
							<label>Number of questions you want to attempt: </label>
							<input
								type='text'
								placeholder='Number of questions you want to attempt...'
								name='maxQues'
								value={maxQues}
								onChange={handleChange}
							/>
							<label>Max range of operands:</label>
							<input
								type='text'
								placeholder='Max range of operands...'
								name='maxValue'
								value={maxValue}
								onChange={handleChange}
							/>
							<label>Operators you want to practice with: </label>
							<input
								type='text'
								placeholder='Operators you want to practice with...'
								name='operators'
								value={operators}
								onChange={handleChange}
							/>
							<small className='form-text'>
								* Please use comma separated values for operators (eg. +, -, *,
								/)
							</small>
						</div>
						<button className='btn lead' onClick={handleClick}>
							{" "}
							Start Quiz{" "}
						</button>
					</form>
				</>
			)}
		</div>
	);

	//timer
	//reset button
};

export default QuizArea;
