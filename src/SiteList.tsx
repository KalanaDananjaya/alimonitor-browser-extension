import { Typography } from '@material-ui/core';
import Config from './Config'

function SiteList (props) {

    const mainStyle = (menuOpened) => {
        if (menuOpened) {
            return ({
                opacity: 0,
                zindex: 0,
                marginLeft: "1.75%"
            })
        } else {
            return ({
                opacity: 100,
                marginLeft: "1.75%"
            })
        }
      }

    return (
        <Typography variant="body2" align="center" style={mainStyle(props.menuOpened)}>Sitelist : [ {localStorage.getItem(Config.siteList)} ]</Typography>
    )
}

export default SiteList;