import { useState, useEffect, useRef } from "react";
import "./App.css";


function App() {
	const [url, setUrl] = useState('');
	const [disabled, setDisabled] = useState(false);
	const ref = useRef(null)
	const refImg = useRef(null)

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				console.log(entry)
				window.CustomElement.setHeight(Math.max(200, parseInt(ref.current.clientHeight) + 50))
			}
		});

		// Setup with initial value and disabled state
		function initCustomElement() {
			console.log("init");
			try {
				CustomElement.init((element, context) => {
					// Setup with initial value and disabled state
					setUrl(element.value);
				});

				// React on disabled changed (e.g. when publishing the item)
				CustomElement.onDisabledChanged((_disabled) => {
					setDisabled(_disabled);
				});

				resizeObserver.observe(refImg.current)
			} catch (err) {
				// Initialization with Kentico Custom element API failed (page displayed outside of the Kentico UI)
				console.error(err);
			}
		}

		initCustomElement();

	}, [])

	return (
		<div ref={ref} className="App">
			<header className="App-header">
				<label>
					Url:
					<textarea disabled={disabled} placeholder="input url here" value={url}
						onChange={(e) => {
							setUrl(e.target.value)
							window.CustomElement.setValue(e.target.value);
						}}
					/>
				</label>
				<div ref={refImg} style={{ marginTop: 8 }}>
				{
					!!url && (
						<img src={url} alt="" />
					)
				}
				</div>
			</header>
		</div>
	);
}

export default App;
