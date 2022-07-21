import "./style.css";
import QuizArea from "./components/QuizArea";
import { useState } from "react";

function App() {
	const totalQuiz = parseInt(process.env.REACT_APP_QUIZ_COUNT);

	const [allScore, setAllScore] = useState(Array(totalQuiz).fill(0));

	const calculateTotalScore = (id, score) => {
		const tempTotalScore = [...allScore];
		tempTotalScore[id] = score;

		console.log(tempTotalScore);

		setAllScore(tempTotalScore);
	};

	return (
		<div className='container'>
			<h4 className='large'>
				Cumulative Score:&nbsp;
				{allScore.reduce(
					(prevValue, currentValue) => prevValue + currentValue,
					0
				)}
			</h4>
			<br />
			{allScore.map((_, index) => {
				return (
					<QuizArea
						key={index}
						id={index}
						calculateTotalScore={calculateTotalScore}
					/>
				);
			})}
			<p> Copyright @ Pragya Patel </p>
		</div>
	);
}

export default App;
