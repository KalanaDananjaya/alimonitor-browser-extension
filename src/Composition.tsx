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

    const colorArray = [ "#04CCFE", "#FF0202", "#FFB602", "#03BFE0", "#A704FE", "#FEC504", "#617169", "#FF5733" ]
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
        <div style={{ width: "100%", display: 'inline-block', textAlign: 'center', textAlignLast: 'center'}}>
            <PieChart data={data} style={{ height: '300px', width: '50%' }} label={({ dataEntry }) => {
                if (dataEntry.value > 5000) {
                    return dataEntry.title;
                } else {
                    return ''
                }
            }} labelStyle={{
            ...defaultLabelStyle,
        }} />

            <TableContainer component={Paper} sx = {{ maxWidth: '200px', float: 'right'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell># Jobs</TableCell>
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
                    <TableCell>{row.value}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    )
}

export default Composition;
