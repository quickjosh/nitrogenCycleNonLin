var START_YEARS = 0;//Initial value for years. Set as CONSTANT to prevent side-effects
var START_TREES = 60;//Initial value for tree. Set as CONSTANT to prevent side-effects
var START_SOILNUM = 120;//Initial value for years. Set as CONSTANT to prevent side-effects
var flowIncrArrow = document.getElementById("flowIncrArrow");//Container for arrow
var dentrArrow = document.getElementById("dentrArrow");//Container for arrow
var uptakeArrow = document.getElementById("uptakeArrow");//Container for arrow
var decompArrow = document.getElementById("decompArrow");//Container for arrow
var soilPool = document.getElementById("soilPool");//Container for soilPool
var treePool = document.getElementById("treePool");//Container for treePool
var years, trees, soilNum;//Variables for reset function to change

resetValue();//Call for reset function

function flowMaker() {//Button for increasing fixation
    var fixValue = document.getElementById("flowIncr").value;//Points to value for options
    var dentValue = document.getElementById("dentInc").value;//Points to value for options
    var uptakeValue = document.getElementById("uptakeInc").value;//Points to value for options
    var decompValue = document.getElementById("decompInc").value;//Points to value for options

    years += 10;//Value for year incrementer
    years === 500 ? (document.getElementById("10years").disabled = true) : false;//Disables button at value 50years

    soilNum += ((fixValue * 10) + (decompValue * 10)) - ((uptakeValue * 10) + (dentValue * 10));//equations for output
    trees += ((uptakeValue * 10) - (decompValue * 10));//equations for output
    if (trees<=0) {
        trees = 0;
        document.getElementById("treePool").style.background = "rgba(68, 27, 0, .1)";
        document.getElementById("treePool").style.boxShadow = "0 0 10px 5px rgba(68, 27, 0, .1)";
        document.getElementById("treePool").style.padding = "11px";

    } else {
        document.getElementById("treePool").style.background = "";
        document.getElementById("treePool").style.boxShadow = "";
        document.getElementById("treePool").style.padding = "";
    }

    if (soilNum<=0) {
        soilNum = 0;
        document.getElementById("soilPool").style.background = "rgba(68, 27, 0,.1)";
        document.getElementById("soilPool").style.boxShadow = "0 0 10px 5px rgba(68, 27, 0,.1)";
        document.getElementById("soilPool").style.padding = "78px";
    } else {
        document.getElementById("soilPool").style.background = "";
        document.getElementById("soilPool").style.boxShadow = "";
        document.getElementById("soilPool").style.padding = "";
    }
    render();
}


function render() {//created to stop redundancy in the resetValue function
    document.getElementById("tree").innerHTML = trees;
    document.getElementById("year").innerHTML = years;
    document.getElementById("soil").innerHTML = soilNum;
    soilPool.style.padding = Math.round(soilNum/30 + 10) + 'px';//
    treePool.style.padding = Math.round(trees/10 + 10) + 'px';//
    if (soilNum>=590) {
        document.getElementById("soilPool").style.padding = "30px";
        document.getElementById("nitroSoilFull").style.display = "block";
    }
    else {
        document.getElementById("nitroSoilFull").style.display = "none";
    }

    if (trees>=660) {
        document.getElementById("treePool").style.padding = "76px";
        document.getElementById("nitroTreeFull").style.display = "block";
    } else {
        document.getElementById("nitroTreeFull").style.display = "none";
    }

}

function resetValue() {//resets value for years, trees soil and padding.
    years = START_YEARS;//constants to reset values
    trees = START_TREES;
    soilNum = START_SOILNUM;
    treePool.style.padding = "";
    soilPool.style.padding = "";

    document.getElementById("treePool").style.background = "#ebf8ca";
    document.getElementById("treePool").style.boxShadow = "0 0 10px 5px #ebf8ca";

    document.getElementById("soilPool").style.background = "rgb(68, 27, 0)";
    document.getElementById("soilPool").style.boxShadow = "0 0 10px 5px rgb(68, 27, 0)";

    render();

    document.getElementById("10years").disabled = false;
    window.onLoad = decompFlow();
    window.onLoad = uptakeFlow();
    window.onLoad = dentrificationFlow();
    window.onLoad = selectFlow();
}

document.addEventListener("change", selectFlow);

function selectFlow() {
    if (document.getElementById("flowIncr").value != 0) {
    flowIncrArrow.style.borderLeftWidth = "";//Resets stroke width / 2
    flowIncrArrow.style.borderBottomWidth = "";//Resets stroke width
    flowIncrArrow.style.display = "block";
    document.getElementById("arrowRight").style.display = "block";

        var fixWidth = normalizers.flow(document.getElementById("flowIncr").value);
        var widthNum = 10 * fixWidth//ALPHA * Math.log(BETA * (fixWidth + 2));//non-linear equation for line width

    var borderLeft = flowIncrArrow.style.borderLeftWidth;//Increases stroke width left
    borderLeft = Number(borderLeft.slice(0, borderLeft.length - 2));
    flowIncrArrow.style.borderLeftWidth = (borderLeft + widthNum) + 'px';

    var borderBottom = flowIncrArrow.style.borderBottomWidth;//Increases stroke width bottom
    borderBottom = Number(borderBottom.slice(0, borderBottom.length - 2));
    flowIncrArrow.style.borderBottomWidth = (borderBottom + widthNum) + 'px';
} else {
        flowIncrArrow.style.display = "none";
        document.getElementById("arrowRight").style.display = "none";
    }
}

document.addEventListener("change", dentrificationFlow);

function dentrificationFlow() {
    if (document.getElementById("dentInc").value != 0) {
    document.getElementById("arrowUp2").style.display = "block";
    dentrArrow.style.display = "block";
    dentrArrow.style.borderRightWidth = "";//Resets stroke width
    dentrArrow.style.borderBottomWidth = "";//Resets stroke width
    arrowUp2.style.right = "";

        var fixWidth = normalizers.dent(document.getElementById("dentInc").value);
        var widthNum = 8 * fixWidth//ALPHA * Math.log(BETA * (fixWidth + 2));//non-linear equation for line width


    var borderRight = dentrArrow.style.borderRightWidth;//Increases stroke width right
    borderRight = Number(borderRight.slice(0, borderRight.length - 2));
    dentrArrow.style.borderRightWidth = (borderRight + widthNum) + 'px';

    var widthDen = widthNum/2 + 16;
    var arrHeadChange = arrowUp2.style.right;
    arrHeadChange = Number(arrHeadChange.slice(0, arrHeadChange.length-2));
    arrowUp2.style.right = (arrHeadChange + widthDen) + 'px';

    var rightBorderBottom = dentrArrow.style.borderBottomWidth;//Increases stroke width bottom
    rightBorderBottom = Number(rightBorderBottom.slice(0, rightBorderBottom.length - 2));
    dentrArrow.style.borderBottomWidth = (rightBorderBottom + widthNum) + 'px';
    } else {
        dentrArrow.style.display = "none";
        document.getElementById("arrowUp2").style.display = "none";
    }
}

document.addEventListener("change", uptakeFlow);

function uptakeFlow() {
    if (document.getElementById("uptakeInc").value != 0) {
        document.getElementById("arrowUp").style.display = "block";
        uptakeArrow.style.borderRightWidth = "";//Resets stroke width
        uptakeArrow.style.display = "block";
        arrowUp.style.right = "";
        var fixWidth = normalizers.uptake(document.getElementById("uptakeInc").value);
        var widthNum = 8 * fixWidth//ALPHA * Math.log(BETA * (fixWidth + 2));//non-linear equation for line width

        var borderRight = uptakeArrow.style.borderRightWidth;//Increases stroke right
        borderRight = Number(borderRight.slice(0, borderRight.length - 2));
        uptakeArrow.style.borderRightWidth = (borderRight + widthNum) + 'px';

        var widthUptake = widthNum/2-75;

        var arrHeadChange = arrowUp.style.right;
        arrHeadChange = Number(arrHeadChange.slice(0, arrHeadChange.length-2));
        arrowUp.style.right = (arrHeadChange + widthUptake) + 'px';

    } else {
        uptakeArrow.style.display = "none";
        document.getElementById("arrowUp").style.display = "none";
    }
}

document.addEventListener("change", decompFlow);

function decompFlow() {
    if (document.getElementById("decompInc").value != 0) {
        document.getElementById("arrowDown").style.display = "block";
        decompArrow.style.borderRightWidth = "";//Resets stroke width
        arrowDown.style.left = "";
        decompArrow.style.display = "block";
        var fixWidth = normalizers.decomp(document.getElementById("decompInc").value);
        var widthNum = 8 * fixWidth//ALPHA * Math.log(BETA * (fixWidth + 2));//non-linear equation for line width


        var borderRight = decompArrow.style.borderRightWidth;//moves the arrowhead to center of border-line
        borderRight = Number(borderRight.slice(0, borderRight.length - 2));
        decompArrow.style.borderRightWidth = (borderRight + widthNum) + 'px';

        var widthDecomp =  widthNum/2-79;
        var arrHeadChange = arrowDown.style.right;
        arrHeadChange = Number(arrHeadChange.slice(0, arrHeadChange.length-2));
        arrowDown.style.left = (arrHeadChange + widthDecomp) + 'px';


    } else {
        decompArrow.style.display = "none";
        document.getElementById("arrowDown").style.display = "none";
    }
}









