function colorEstat() {
    //funcio per definir colors de les barres
    var Estats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]; //aqui son els diferents estats
    var colorsEstats = [" ", "Blue", "Yellow", "Coral", "Gold", //colors corresponents a cada numero de 1 a 5 
        "Green", "Orange", "Steelblue", "Red", "Pink", //de 6 a 10
        "White", "Olive", "Limegreen", "Teal", "Darkgreen", //de 11 a 15
        "Aqua", "Silver", "Khaki", "Crimson", "Tan", // de 16 a 20
        "Brown", "Chocolate" //de 21 a 22
    ]

    var color = d3.scale.ordinal()
        .domain(Estats)
        .range(colorsEstats)
    return color
};

function nomEstat() {
    //funcio per definir etiquetes estats
    var Estats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]; //aqui son els diferents estats
    var nomsEstats = ["MS_IDLE", "MS_STOPPED", "MS_RESETING", "MS_STOC_DAVANT", "MS_STOC_DARRERA", //noms corresponents a cada numero de 1 a 5 
        "MS_EXECUTE", "MS_FORMATCHANGE", "MS_INVALID", "MS_ABORTED", "MS_ABORTED", //de 6 a 10
        "MS_COLISIO", "MS_STARTING", "MS_SUSPENDED", "MS_HOLDING", "MS_STOPPING", //de 11 a 15
        "MS_ABORTING", "MS_HELD", "MS_UNHOLDING", "MS_SUSPENDING", "MS_UNSUSPENDING", // de 16 a 20
        "MS_COMPLETING", "MS_COMPLETED" //de 21 a 22
    ]

    var nom = d3.scale.ordinal()
        .domain(Estats)
        .range(nomsEstats)
    return nom
};