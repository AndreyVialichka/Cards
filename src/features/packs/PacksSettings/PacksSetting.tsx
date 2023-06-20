import { TextField, Typography } from "@mui/material"
import Switch from '@mui/material/Switch';
import s from "./styles.module.css";
import { RangeSlider } from "./Slider/Slider";
const label = { inputProps: { 'aria-label': 'Switch demo' } };


export  const PacksSetting = (props:any) => {
    return (
        <div className={s.container}>
            <TextField
                onChange={props.searchPacksHander} 
                value={props.searchValue}
                id="standard-basic" label="Standard" variant="standard" />
            <Typography>Off</Typography>
            <Switch {...label} onChange={props.changeMyPacksStatus} checked={props.myPacksStatus}/>
            <Typography>On</Typography>
            <RangeSlider
                sliderChangeHandler={props.sliderChangeHandler}
                sliderValue = {props.sliderValue}
            />
        </div>
    )
}