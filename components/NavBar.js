import React from 'react';
import { Link } from 'react-router-dom'

export default function NavBar({
        root = ""
        , brand = "Navigation"
        , menuItems = []
        , isLoggedIn = false
        , history
        , signOut
    }
) {

    let menu = generateMenu(menuItems, root);

    console.log("navbar", root)

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href={root}>{brand}</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav w-100">
                    {menu}

                    <li className="nav-item ml-auto" data-visibility={!isLoggedIn}>
                        <a href="#" className="nav-link">Sign in</a>
                    </li>

                    <li className="nav-item ml-auto" data-visibility={isLoggedIn}>
                        <a href="" className="nav-link" onClick={signOutHandler}>Sign out</a>
                    </li>

                </ul>
            </div>


        </nav>
    );

    function signOutHandler(e) {
        e.preventDefault()
        signOut()
    }

    /**
     * generate navbar menu list
     * @param {Array} menuItems
     * Array of arrays with 3 indices
     * 0 - Name of item
     * 1 - Link for item
     * 2 - Whether item should show when logged in
     */
    function generateMenu(menuItems) {
        return menuItems.map(el => {
            let [name, link, showIfLoggedIn] = el;
            link = root + link;
            let visibility = isLoggedIn ? showIfLoggedIn : !showIfLoggedIn

            return (
                <li className="nav-item" key={name} data-visibility={visibility}>
                    <a href={link} className="nav-link">{name}</a>
                </li>
            );
        })
    }

}