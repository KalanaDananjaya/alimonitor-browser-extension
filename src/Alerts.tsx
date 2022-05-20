import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";

function createData(
  issueMessage: string,
  issueFullText: string,
  issueType: string,
  issueLink: string,
) {
  return { issueMessage, issueFullText, issueType, issueLink };
}

interface alertProps {
    issueMessage: string,
    issueFullText: string,
    issueType: string,
    issueLink: string
}



function Alerts (props) {
    
    const alerts: alertProps[] = [];

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

    props.issues.csIssues.forEach(issue => {
        const row = createData(issue.label, issue.fulltext, "Central Services", issue.link);
        alerts.push(row)
        
    });

    props.issues.siteIssues.forEach(issue => {
        const row = createData(issue.label, issue.fulltext, issue.services, issue.link);
        alerts.push(row)
        
    });

    const handleClick = (url) => {
        props.createTab(url)
    }

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Issue</TableCell>
                {/* <TableCell>Message</TableCell> */}
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.map((row,index) => (
                <TableRow hover
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=>{handleClick(row.issueLink)}}
                classes={{
                    root: classes.row,
                    hover: classes.hover}}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.issueMessage}
                  </TableCell>
                  {/* <TableCell>{row.issueFullText}</TableCell> */}
                  <TableCell>{row.issueType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default Alerts;
