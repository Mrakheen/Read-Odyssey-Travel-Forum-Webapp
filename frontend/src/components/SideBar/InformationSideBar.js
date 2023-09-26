import React from "react";
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";

function InformationSideBar() {
    return (
        <Card className="p-4 rounded" id="informationSideBarSize">
            <small>
                Welcome to Redyssey! Redyssey is a place for you to share travel experiences and explore possible travel destinations. Redyssey derives from the word "Read Odyssey". Technologies used to make Redyssey are <span style={{ color: "blue" }}><b>React+Redux</b></span> (frontend) and <span style={{ color: "green" }}><b>Django</b></span> (backend).
                <br />
                <hr />
            </small>
        </Card>
    );
}

export default InformationSideBar;
