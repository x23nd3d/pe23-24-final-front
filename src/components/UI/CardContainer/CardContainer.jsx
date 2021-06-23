import React from "react";
import Card from "../Card/Card";
import projectImage from "../../../img/Card/blackman.png";
import projectImage1 from "../../../img/Card/clothing.png"
import projectImage2 from "../../../img/Card/three_girls.png"
import classes from "./CardContainer.module.scss";

const CardContainer = () => (
    <div className={classes.SectionNew}>
        <div className={classes.SectionNewText}>
            NEW
        </div>
        <div className={classes.CardContainer}>
        <div>
        <Card
            imgUrl={projectImage}
            text="NEW IN"
            styles={{width:"95%", height:"100%"}}/>
        </div>
       
       <div className={classes.RightSideImage}>
        <Card
            imgUrl={projectImage2}
            text="NEW COLLECTION"
            styles={{width:"95%", height:"49%"}}/>
        <Card
            imgUrl={projectImage1}
            text="NEW COLLECTION"
            styles={{width:"95%", height:"49%"}}/>
       </div>
    </div>
    </div>
   
   
)
 export default CardContainer;