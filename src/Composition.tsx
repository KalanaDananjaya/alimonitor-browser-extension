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
        fontFamily: 'sans-serif',
        padding: '50px'
      };

    const useStyles = makeStyles((theme) => ({
        row: {
          cursor: "pointer",
        },
        hover: {
          "&:hover": {
            backgroundColor: "grey !important",
            color: " #fff !important",
          },
        }
      }));
    
    const classes = useStyles();

    const colorArray = ["#FF5733", "#04FE22", "#04CCFE", "#9004FE", "#0440FE", "#A704FE", "#FEC504", "#617169" ]
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
    <div>
        <PieChart data={data} label={({ dataEntry }) => {
            if (dataEntry.value > 100) {
                return dataEntry.title + ":" + dataEntry.value;
            } else {
                return ''
            }
        }} labelStyle={{
        ...defaultLabelStyle,
      }} />

<TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>JobType</TableCell>
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
