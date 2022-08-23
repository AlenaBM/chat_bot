import { useEffect, useState } from "react"
import Button from "../Button/Button"

import {ReactComponent as MoonIcon} from '../../assets/icon_moon.svg';
import {ReactComponent as SunIcon} from '../../assets/icon_sun.svg';

import styles from "./ThemeSwitcher.module.scss";

const THEMES = {
	LIGHT: 'light',
	DARK: 'dark'
}

export const ThemeSwitcher = () => {
	const body = document.body
	const [theme, setTheme] = useState(localStorage.getItem("chat_bot_theme"))

    const switchTheme = () => {
        
		if (theme === THEMES.DARK) {
			body.classList.replace(THEMES.DARK, THEMES.LIGHT)
			localStorage.setItem("chat_bot_theme", THEMES.LIGHT)
			setTheme(THEMES.LIGHT)
		} else {
			body.classList.replace(THEMES.LIGHT, THEMES.DARK)
			localStorage.setItem("chat_bot_theme", THEMES.DARK)
			setTheme(THEMES.DARK)
		}
	}

	useEffect(() => {
        if (theme) {
            body.classList.add(theme);
        } else {
            body.classList.add('dark');
        }
	}, [])

	return <Button type="button" className={styles.themeSwither} actionHadler={switchTheme}>
        {theme === THEMES.LIGHT ? <SunIcon className={styles.themeSwither__icon_sun} /> : <MoonIcon className={styles.themeSwither__icon_moon} /> }
    </Button>
}
