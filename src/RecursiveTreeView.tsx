import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useState, useEffect } from 'react';
import Config from './Config'
import axios from 'axios';


function RecursiveTreeView(props) {

const [menuItems, setMenuItems] = useState({
	"id" : 0,
	"name" : "ALICE Repository",
	"prefix" : "//alimonitor.cern.ch",
	"url" : null,
	"children" : []
});

const [isLoaded, setIsLoaded] = useState(false);
const menuItemUrls = {}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 400,
        zIndex:1000,
        position: 'relative',
        float: 'left'
    },
});

const getMenuData = () => {
    axios
        .get(Config.baseUrl + "menu.json")
        .then(function (response) {
            setIsLoaded(true);
            setMenuItems(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}


const populateMenu = (menuItem) => {
    if (menuItem.children.length > 0) {
        // If menu item has no children and has a url, add a clone of the menu item at the sub menu with its url
        if (menuItem.url !== undefined && menuItem.url !== null && menuItem.url !== "") {
            const clonedChild = {
                id : menuItem.id + "X",
                name : menuItem.name,
                url : menuItem.url,
                children : []
            }
            menuItem.url = '';
            // add child
            menuItem.children.push(clonedChild)
        }
    }
    
    menuItemUrls[menuItem.id] = menuItem.url;

    if (menuItem.children.length > 0) {
        for (let index in menuItem.children) {
            let child = menuItem.children[index]
            populateMenu(child)
        }
    } else {
        return
    }
}
useEffect(() => {
    getMenuData()
    populateMenu(menuItems)
    setMenuItems(menuItems)
  }, []);


const checkMenuExpanded = (nodeId) => {
    if (nodeId == 0) {
        props.setMenuOpened(!props.menuOpened)
    }
}


const handleTreeItemClick = (event, nodeId) => {
    checkMenuExpanded(nodeId);
    
    var url = menuItemUrls[nodeId];
    if (url === null || url ==='' || url === undefined) {
        // do nothing
    } 
    // If the url starts with http, do not add the prefix
    else if (/^(http)/.test(url)){
        // chrome.tabs.create({ url: newURL });
        props.createTab(url)
    } else {
        // chrome.tabs.create({ url: newURL });
        props.createTab(menuItems.prefix + url)
    }
  
}

const classes = useStyles();

    const renderTree = (node) => {
        return (
            <TreeItem key={node.id.toString()} nodeId={node.id.toString()} label={node.name}>
                    {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
                </TreeItem>
        )
    };

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeSelect = {(ele,node)=>{handleTreeItemClick(ele,node)}}
        >
            {renderTree(menuItems)}
        </TreeView>
    );

}
export default RecursiveTreeView;
    