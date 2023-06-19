import { TextField, Typography } from "@mui/material"
import Switch from '@mui/material/Switch';
import { Slider } from '@mui/material';
import s from "./styles.module.css";
const label = { inputProps: { 'aria-label': 'Switch demo' } };


export  const PacksSetting = (props:any) => {
    const onChangeHandler = (e:any)=> {
        console.log(e.curret)
        debugger
    }
    return (
        <div className={s.container}>
            <TextField
                onChange={props.searchPacksHander} 
                value={props.searchValue}
                id="standard-basic" label="Standard" variant="standard" />
            <Typography>Off</Typography>
            <Switch {...label} onChange={onChangeHandler} checked={false}/>
            <Typography>On</Typography>
            <Slider />
        </div>
    )
}