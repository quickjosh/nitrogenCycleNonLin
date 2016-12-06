
var selects = {
    flow : document.getElementById("flowIncr"),
    dent : document.getElementById("dentInc"),
    decomp : document.getElementById("decompInc"),
    uptake : document.getElementById("uptakeInc")
};

var flows = {
    flow:[0.0, 0.001, 0.003, 0.05, 0.09, 0.12],
    dent:[0.0, 10.0, 20.0, 30.0, 40.0, 60.0],
    decomp: [0.0, 12.0, 14.0, 16.0, 22.0, 20.0],
    uptake:[0.0, 100.0, 200.0, 300.0, 400.0, 500.0]
};



function normalizer(arr) {
    var min = Math.min.apply(null, arr)
    var max = Math.max.apply(null, arr)
    return function(val){
        return (val - min)/(max - min);
    }
}

var normalizers = {};

for (var key in flows){
    flows[key].sort((a,b) => a-b).map(function(value){
        var element = document.createElement("option");
        element.textContent = value;
        element.value = value;
        selects[key].appendChild(element)
        selects.flow.selectedIndex = 3;
        selects.dent.selectedIndex = 1;
        selects.decomp.selectedIndex = 4;
        selects.uptake.selectedIndex = 2;

    });

    normalizers[key] = normalizer(flows[key])
}
