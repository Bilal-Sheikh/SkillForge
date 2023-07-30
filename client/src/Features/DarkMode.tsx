import React from "react";
import "./DarkMode.css";
import { useNavigate } from "react-router-dom";

function DarkMode() {
	const setDark = () => {
		localStorage.setItem("theme", "dark");
		document.documentElement.setAttribute("data-theme", "dark");
	};

	const setLight = () => {
		localStorage.setItem("theme", "light");
		document.documentElement.setAttribute("data-theme", "light");
	};

	const storedTheme = localStorage.getItem("theme");

	const prefersDark =
		window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

	const defaultDark =
		storedTheme === "dark" || (storedTheme === null && prefersDark);

	if (defaultDark) {
		setDark();
	}

	const navigate = useNavigate();

	const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			window.location.reload();
			setDark();
		} else {
			window.location.reload();
			setLight();
		}
	};

	return (
		<div className="toggle-theme-wrapper">
			<span>☀️</span>
			<label className="toggle-theme" htmlFor="checkbox">
				<input
					type="checkbox"
					id="checkbox"
					// NEW
					onChange={toggleTheme}
					defaultChecked={defaultDark}
				/>
				<div className="slider round"></div>
			</label>
			<span>🌒</span>
		</div>
	);
}

export default DarkMode;
