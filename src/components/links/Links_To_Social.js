// Importing necessary CSS styles and external libraries.
import './Links_Style.css';
import confetti from 'canvas-confetti';
import 'font-awesome/css/font-awesome.min.css';
import React, { useState, useRef, useEffect } from 'react';

// Constants for configuring the confetti effect.
const BURST_DELAY = 200; //----------- Delay between each burst of confetti.
const CONFETTI_DURATION = 300 * 16; // Duration for the confetti animation effect.

function Links_To_Socials() {
	// React hooks for managing component state.
	const [is_social_panel_visible, Set_Is_Social_Panel_Visible] = useState(false); // State for controlling the visibility of the social panel.
	const [is_confetti_active, Set_Is_Confetti_Active] = useState(false); //---------- State for tracking if the confetti animation is active.
	const confetti_timeout_ref = useRef(null); //------------------------------------- Ref to store the timeout instance for the confetti effect.

	// Function to toggle the visibility of the social panel.
	const Toggle_Social_Panel = () => Set_Is_Social_Panel_Visible(!is_social_panel_visible);

	// Function to close the social panel.
	const Close_Social_Panel = () => Set_Is_Social_Panel_Visible(false);

	// * CONFETTI -----------------------------------------------------------------------------------------------------------------------------

	// Function to start the confetti effect with a random number of bursts.
	const Start_Confetti = () => {
		const random_bursts = Math.round(Random_In_Range(1, 4));
		Fire_Confetti_Bursts(random_bursts);
	};

	// Function to create multiple bursts of confetti.
	const Fire_Confetti_Bursts = (number_of_bursts) => {
		// Exit if confetti is already active.
		if (is_confetti_active) {
			return;
		}

		// Set the confetti state to active.
		Set_Is_Confetti_Active(true);

		// Loop to fire multiple bursts with delays.
		for (let i = 0; i < number_of_bursts; i++) {
			setTimeout(() => {
				// Call the confetti function with configured properties.
				confetti(Configure_Confetti());
			}, i * BURST_DELAY);
		}

		// Set a timeout to stop the confetti after a specified duration.
		confetti_timeout_ref.current = setTimeout(Stop_Confetti, CONFETTI_DURATION);
	};

	// Function that returns configuration properties for the confetti animation.
	const Configure_Confetti = () => ({
		particleCount: Random_In_Range(266, 444),
		spread: Random_In_Range(277, 333),
		startVelocity: Random_In_Range(18, 33),
		gravity: Random_In_Range(0.6, 0.8),
		ticks: 300,
		shapes: ['circle', 'square'],
		scalar: Random_In_Range(0.6, 0.8),
		zIndex: 9999,
		origin: {
			x: Random_In_Range(0.1, 0.9),
			y: Random_In_Range(0.1, 0.3),
		},
		colors: [
			[165, 104, 246],
			[230, 61, 135],
			[0, 199, 228],
			[253, 214, 126],
			[253, 114, 116],
			[54, 169, 225],
			[123, 237, 159],
			[255, 159, 243],
			[255, 159, 67],
			[4, 217, 255],
			[255, 255, 0],
			[255, 105, 180],
			[138, 43, 226],
			[0, 255, 127],
			[210, 105, 30],
			[255, 140, 0],
			[70, 130, 180],
			[255, 20, 147],
			[0, 191, 255],
			[147, 112, 219],
		],
	});

	// Function to generate a random number within a given range.
	const Random_In_Range = (min, max) => Math.random() * (max - min) + min;

	// Function to stop the confetti effect and reset its state.
	const Stop_Confetti = () => {
		// Clear the timeout if it exists.
		if (confetti_timeout_ref.current) {
			clearTimeout(confetti_timeout_ref.current);
			confetti_timeout_ref.current = null;
		}

		// Reset the confetti animation.
		confetti.reset();

		// Set the confetti state to inactive.
		Set_Is_Confetti_Active(false);
	};

	// Using the 'useEffect' hook to add event listeners for the confetti animation when the component mounts.
	useEffect(() => {
		// Selecting all relevant elements.
		const hover_elements = document.querySelectorAll('.social-panel ul li a, .social-panel .fa-heart');

		// Adding 'mouseenter' and 'mouseleave' event listeners to start and stop the confetti.
		hover_elements.forEach((elem) => {
			elem.addEventListener('mouseenter', Start_Confetti);
			elem.addEventListener('mouseleave', Stop_Confetti);
		});

		// Cleanup function to remove the event listeners when the component unmounts.
		return () => {
			hover_elements.forEach((elem) => {
				elem.removeEventListener('mouseenter', Start_Confetti);
				elem.removeEventListener('mouseleave', Stop_Confetti);
			});

			// Clear the confetti timeout.
			if (confetti_timeout_ref.current) clearTimeout(confetti_timeout_ref.current);
		};
	});
	// * CONFETTI -----------------------------------------------------------------------------------------------------------------------------

	// The rendered JSX of the Links component.
	return (
		<div className="reset">
			<section className={`social-panel-container ${is_social_panel_visible ? 'visible' : ''}`} aria-label="Contact and Social Links">
				<div className="social-panel">
					<p>
						Looking forward to working with <i className="fa fa-heart heart-icon" aria-hidden="true"></i>
						<br />
						<a href="https://github.com/PinkFlamingoz" target="_blank" rel="noopener noreferrer">
							Hristijan Stavrov
						</a>
					</p>

					<nav>
						<ul>
							<li>
								<a href="https://github.com/PinkFlamingoz" target="_blank" rel="noopener noreferrer" aria-label="Hristijan Stavrov on GitHub">
									<i className="fa fa-github" aria-hidden="true"></i>
								</a>
							</li>
							<li>
								<a href="https://github.com/PinkFlamingoz" target="_blank" rel="noopener noreferrer" aria-label="Hristijan Stavrov on GitHub">
									<i className="fa fa-github" aria-hidden="true"></i>
								</a>
							</li>
							<li>
								<a href="https://github.com/PinkFlamingoz" target="_blank" rel="noopener noreferrer" aria-label="Hristijan Stavrov on GitHub">
									<i className="fa fa-github" aria-hidden="true"></i>
								</a>
							</li>
						</ul>
					</nav>

					<button onClick={Close_Social_Panel} type="button" className="close-button" aria-label="Close social panel">
						<i className="fa fa-times" aria-hidden="true"></i>
					</button>
				</div>
			</section>

			<section>
				<button onClick={Toggle_Social_Panel} type="button" className="floating-button" aria-label="Toggle social panel visibility">
					Find Me
				</button>
			</section>
		</div>
	);
}

// Export the Links component to be used in other parts of the app.
export default Links_To_Socials;
