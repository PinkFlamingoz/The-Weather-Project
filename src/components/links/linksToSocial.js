import './LinksStyle.css';
import React, { useState } from 'react';

function LinksToSocials() {
	const [linksMenu, setLinksMenu] = useState(false);
	const showLinksMenu = () => setLinksMenu(!linksMenu);
	return (
		<div className="social-container">
			<div
				className={
					linksMenu
						? 'social-panel-container-visable'
						: 'social-panel-container'
				}
			>
				<div className="social-panel">
					<p>
						Looking forward to work with{' '}
						<img
							src={`icons/icons8-fire-heart-48.png`}
							className="icon-links-heart"
							alt="git"
						/>
						<br></br>
						<a
							target="_blank"
							href="https://github.com/PinkFlamingoz"
							rel="noreferrer"
						>
							Hristijan Stavrov
						</a>
					</p>
					<button onClick={showLinksMenu} className="close-btn">
						<img
							src={`icons/icons8-close.svg`}
							className="icon-links-close"
							alt="git"
						/>
					</button>
					<h4>You found me</h4>
					<ul>
						<li>
							<a
								href="https://github.com/PinkFlamingoz"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={`icons/icons8-github.svg`}
									className="icon-links"
									alt="git"
								/>
							</a>
						</li>
						<li>
							<a
								href="https://github.com/PinkFlamingoz"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={`icons/icons8-github.svg`}
									className="icon-links"
									alt="git"
								/>
							</a>
						</li>
						<li>
							<a
								href="https://github.com/PinkFlamingoz"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src={`icons/icons8-github.svg`}
									className="icon-links"
									alt="git"
								/>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<button onClick={showLinksMenu} className="floating-btn">
				Find Me
			</button>
		</div>
	);
}
export default LinksToSocials;
