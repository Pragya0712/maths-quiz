import React, { useEffect, useState } from "react";
import Timer from "./Timer";

const Quiz = ({ handleNext, quesNum, maxQues, maxValue, operators }) => {
	const [userInput, setUserInput] = useState("");
	const [ques, setQues] = useState({
		operand1: Math.floor(Math.random() * maxValue),
		operand2: Math.floor(Math.random() * maxValue),
		operator: operators[Math.floor(Math.random() * operators.length)],
	});

	const handleChange = (e) => {
		setUserInput(e.target.value);
	};

	const handleClick = () => {
		const quesString = ques.operand1 + ques.operator + ques.operand2;
		const result = Math.floor(eval(quesString));

		const isCorrect = `${result}` === userInput;

		handleNext(quesString, userInput, isCorrect, result);
		setUserInput("");
	};

	useEffect(() => {
		setQues({
			operand1: Math.floor(Math.random() * maxValue),
			operand2: Math.floor(Math.random() * (maxValue - 1) + 1),
			operator: operators[Math.floor(Math.random() * operators.length)],
		});
	}, [quesNum]);

	return (
		<section>
			<Timer quesNum={quesNum} timeout={handleClick} />
			<h1>
				{" "}
				Ques:&nbsp;
				{quesNum}/{maxQues}{" "}
			</h1>

			<div>
				<h3> {ques.operand1} </h3>
				<h3> {ques.operator} </h3>
				<h3> {ques.operand2} </h3>

				<input
					name='Your answer'
					placeholder='Your answer'
					value={userInput}
					onChange={handleChange}
				/>

				<button className='btn lead' onClick={handleClick}>
					{quesNum === maxQues ? "Submit" : "Next Question"}
				</button>
			</div>
		</section>
	);
};

export default Quiz;
