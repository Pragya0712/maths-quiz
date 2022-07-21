import React, { useEffect, useState } from "react";

const Timer = ({ quesNum, timeout }) => {
	const initialTime = 20;
	const [timeleft, setTimeLeft] = useState(initialTime);

	useEffect(() => {
		let downloadTimer = setInterval(function () {
			if (timeleft <= 0) {
				clearInterval(downloadTimer);
				timeout();
			} else {
				setTimeLeft(timeleft - 1);
			}
			//console.log(timeleft);
		}, 1000);

		return () => {
			clearInterval(downloadTimer);
		};
	}, [timeleft]);

	useEffect(() => {
		setTimeLeft(initialTime);
	}, [quesNum]);

	return <span className='timer'> Timer: {timeleft} </span>;
};

export default Timer;
