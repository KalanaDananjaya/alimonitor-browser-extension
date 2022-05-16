import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useState, useEffect } from 'react';
import JsonMenu from './menu.json';
import { Typography } from '@material-ui/core';


function RecursiveTreeView(props) {

const [menuItems, setMenuItems] = useState(JsonMenu);
const menuItemUrls = {}

const useStyles = makeStyles({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
        zIndex:1000,
        position: 'relative'
    },
});



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
    console.log('clicked nodeId is', nodeId, menuItemUrls[nodeId], "-")
    
    var url = menuItemUrls[nodeId];
    if (url === null || url ==='' || url === undefined) {
        // do nothing
        // chrome.tabs.create({ url: newURL });
    } 
    // If the url starts with http, do not add the prefix
    else if (/^(http)/.test(url)){
        // chrome.tabs.create({ url: newURL });
        window.open(url, "_blank");
    } else {
        // chrome.tabs.create({ url: newURL });
        window.open(menuItems.prefix + url, "_blank");
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
    