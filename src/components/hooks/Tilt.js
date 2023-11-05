import { useRef, useEffect } from 'react';

// Custom hook to apply a 3D tilt effect to a component
export const Use_Tilt_Effect = () => {
	const ref = useRef(null);

	useEffect(() => {
		const element = ref.current;

		const Handle_Mouse_Move = (event) => {
			// getBoundingClientRect() provides information about the size of the element and its position relative to the viewport.
			const rect = element.getBoundingClientRect();

			// Get the width and height of the weather card.
			const width = element.offsetWidth;
			const height = element.offsetHeight;

			// Calculate the mouse's X and Y position relative to the weather card.
			// This gives us a value between 0 and the card's width or height.
			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			// The tilt calculations are based on the relative mouse position to the card.
			// We adjust the tilt depending on how close the mouse is to the card's edges.
			// The "5" is a multiplier that controls the degree of tilt.
			const tiltX = -(mouseY / height - 0.5) * 5;
			const tiltY = (mouseX / width - 0.5) * 5;

			// Calculate the shadow offset based on the tilt. The more the tilt, the more offset the shadow will have, giving a dynamic shadow effect.
			const shadowX = tiltY / 4;
			const shadowY = tiltX / 4;

			// Apply the calculated boxShadow to the card.
			element.style.boxShadow = `${shadowX}px ${shadowY}px 15px rgba(0,0,0,0.3)`;

			// Apply the calculated tilt transformation to the card.
			// This will make the card look like it's tilting based on mouse movement.
			element.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
		};

		const Handle_Mouse_Leave = () => {
			// Reset the card's transformations and boxShadow to its original state when the mouse leaves the card. This gives the effect of the card "settling" back into place.
			element.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
			element.style.boxShadow = '0px 0px 15px rgba(0,0,0,0.3)';
		};

		// Attach event listeners to the document for mouse movement and when the mouse leaves the card.
		document.addEventListener('mousemove', Handle_Mouse_Move);
		document.addEventListener('mouseleave', Handle_Mouse_Leave);

		// Cleanup function to ensure no memory leaks. This will remove the event listeners when the component is unmounted or if the useEffect dependencies change.
		return () => {
			document.removeEventListener('mousemove', Handle_Mouse_Move);
			document.removeEventListener('mouseleave', Handle_Mouse_Leave);
		};
	}, []); // Empty dependency array means this useEffect will run only once, similar to componentDidMount.

	return ref;
};
