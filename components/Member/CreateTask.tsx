import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function CreateTask (){
    <div>
        <Card>
            <TextField
                sx={{ width: 400 }}
                id="outlined-basic"
                label="Task"
                variant="outlined"
                />
            <TextField
                sx={{ width: 400 }}
                id="outlined-basic"
                label="Short description"
                variant="outlined"
             />
            <br />
            <TextField
                id="date"
                label="Deadline"
                type="date"
                defaultValue=""
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }} />
            <br />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="23"
                label="Assign Task To"

            >
                {/* {members.map((member: any) => (
                    <MenuItem value={member.member}>{member.member}</MenuItem>
                ))} */}


            </Select>

            <Button
                //id={classes.button}
                variant="contained"
                //onClick={createTask}
            >
                Add
            </Button>
        </Card>
    </div>
}