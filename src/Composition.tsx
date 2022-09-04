import { PieChart } from 'react-minimal-pie-chart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";
  
interface jobTypeProps {
    title: string,
    value: number,
    color: string
}

function Composition(props) {
    const data : jobTypeProps[] = [];

    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif'
      };

    const useStyles = makeStyles((theme) => ({
        row: {
          cursor: "pointer",
        },
        hover: {
          "&:hover": {
            backgroundColor: "grey !important",
            color: " #fff !important",
          }
        }
      }));
    
    const classes = useStyles();

    const colorArray = [ "#EA46C5", "#006661", "#04CCFE", "#ff9738", "#007ED6", "#EACE46", "#efbbbf", "#617169"]
    function createData(title: string, value: number, index: number) {
        const color = colorArray[index];
        return { title, value, color };
    }

    Object.entries(props.composition).map( (item, index) => {
        console.log(item)
        const row = createData(item[0],item[1] as number, index);
        data.push(row);
    });

    return (
        <div style={{ width: "100%", display: 'inline-block', textAlign: 'center'}}>
            <PieChart data={data} style={{ height: '300px', width: '50%' }} label={({ x, y, dx, dy, dataEntry }) => {
                if (dataEntry.value > 5000) {
                    return (
                        <text
                        x={x}
                        y={y}
                        dx={dx}
                        dy={dy}
                        dominant-baseline="central"
                        text-anchor="middle"
                        style={{
                            fill: '#fff', pointerEvents: 'none', fontSize: '5px'
                        }}
                        >
                        <tspan x={x} y={y} dx={dx} dy={dy}>{dataEntry.title}</tspan>
                        <tspan x={x} y={y+5} dx={dx} dy={dy}>{`${((dataEntry.value/props.activeJobs)*100).toFixed(2)}%`}</tspan>
                    </text>
                    );
                } else {
                    return ''
                }
            }} labelStyle={{
            ...defaultLabelStyle,
        }} />

            <TableContainer component={Paper} sx = {{ maxWidth: '310px', float: 'right'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align="right"># Jobs</TableCell>
                    <TableCell align="right">Job %</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row,index) => (
                    <TableRow hover
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    classes={{
                        root: classes.row,
                        hover: classes.hover}}>
                    <TableCell component="th" scope="row">
                        {row.title}
                    </TableCell>
                    <TableCell align="right">{row.value}</TableCell>
                    <TableCell align="right">{((row.value/props.activeJobs)*100).toFixed(2)}%</TableCell>
                    </TableRow>
                ))}
                    <TableCell>Total Jobs</TableCell>
                    <TableCell align="right">{props.activeJobs}</TableCell>
                    <TableCell align="right">100%</TableCell>
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default Composition;
