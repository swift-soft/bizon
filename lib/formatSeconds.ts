export function formatSeconds(seconds: number) {
	// Calculate minutes and remaining seconds
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	// Format remaining seconds with leading zero if necessary
	const formattedSeconds =
		remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

	return `${minutes}:${formattedSeconds}`;
}
