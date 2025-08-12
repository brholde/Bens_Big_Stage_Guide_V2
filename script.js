const dimensionCheckbox = document.getElementById("dimension-checkbox");
let current_layout;
let current_panel_grid;
let current_length;
let current_width;
let needed_four_legs;
let needed_three_legs;

function hide_diagram() {
    document.getElementById("diagram-div").style.display = "none"
}
function show_diagram(){
    document.getElementById("diagram-div").style.display = "flex"
}

function check_all_boxes () {
    const three_leg_input = document.getElementById("three-leg-input-box");
    const four_leg_input = document.getElementById("four-leg-input-box");
    const dim_box_1 = document.getElementById("dimension-input-box-1");
    const dim_box_2 = document.getElementById("dimension-input-box-2");
    const dim_value_1 = Number(dim_box_1.value);
    const dim_value_2 = Number(dim_box_2.value);
    let allGood = true;

    hide_diagram();

    if (three_leg_input.value === "" || four_leg_input.value === "" || dim_box_1.value === "" || dim_box_2.value === "") {
        document.getElementById("calculate-button").disabled = true;
        document.getElementById("calculate-error").textContent = "Please fill in all fields before generating diagram.";
        document.getElementById("calculate-error").style.display = "block";
        document.getElementById("calculate-error").style.animation = "none";
        allGood = false;
    }
    if (dim_value_1 % 4 !== 0 || dim_value_2 % 4 !== 0) {
        document.getElementById("calculate-button").disabled = true;
        document.getElementById("calculate-error").textContent = "Please ensure both dimensions are multiples of 4.";
        document.getElementById("calculate-error").style.display = "block";
        document.getElementById("calculate-error").style.animation = "none";
        allGood = false;
    } else if (!( (dim_value_1%8==0 && dim_value_2%4==0) || (dim_value_1%4==0 && dim_value_2%8==0) )) {
        document.getElementById("calculate-button").disabled = true;
        let suggestion1 = Math.ceil(dim_value_1 / 8) * 8;
        let suggestion2 = Math.ceil(dim_value_2 / 8) * 8;
                document.getElementById("calculate-error").style.animation = "none";
        document.getElementById("calculate-error").textContent = `At least one dimension must be a multiple of 8.`;
        document.getElementById("calculate-error").innerHTML = `At least one dimension must be a multiple of 8.<br><br><b>Suggestion: make length ${suggestion1} ft or make width ${suggestion2} ft.<b>`;
        document.getElementById("calculate-error").style.display = "block";
        allGood = false;
    }
    if (allGood) {
        document.getElementById("calculate-button").disabled = false;
        document.getElementById("calculate-error").style.animation = "fadeOut 2.0s forwards";
        setTimeout(() => {
            document.getElementById("calculate-error").textContent = "";
            document.getElementById("calculate-error").style.display = "none";
        }, 0);
    }
}

document.getElementById("dimension-input-box-1").addEventListener("input", check_all_boxes);
document.getElementById("dimension-input-box-2").addEventListener("input", check_all_boxes);
document.getElementById("three-leg-input-box").addEventListener("input", check_all_boxes);
document.getElementById("four-leg-input-box").addEventListener("input", check_all_boxes);




let leg_input_clear_timer;
let leg_input_animation_timer;
let leg_input_main_timer;

function validate_leg_input() {
    const three_leg_input = document.getElementById("three-leg-input-box");
    const four_leg_input = document.getElementById("four-leg-input-box");
    const three_leg_value = Number(three_leg_input.value);
    const four_leg_value = Number(four_leg_input.value);
    const legError = document.getElementById("leg-input-error");

    clearTimeout(leg_input_animation_timer);
    clearTimeout(leg_input_clear_timer);
    clearTimeout(leg_input_main_timer);

    leg_input_main_timer = setTimeout(() => {
        if (!Number.isInteger(three_leg_value)) {
            legError.textContent = "Please only enter whole numbers.";
            three_leg_input.value = Math.floor(three_leg_input.value);
            legError.style.display = "block";
            legError.style.animation = "none";
        }
        if (!Number.isInteger(four_leg_value)) {
            legError.textContent = "Please only enter whole numbers.";
            four_leg_input.value = Math.floor(four_leg_input.value);
            legError.style.display = "block";
            legError.style.animation = "none";
        }
        if (three_leg_value < 0) {
            legError.textContent = "Please only enter positve values.";
            three_leg_input.value = 0;
            legError.style.display = "block";
            legError.style.animation = "none";
        } 
        if (four_leg_value < 0) {
            legError.textContent = "Please only enter positive values.";
            four_leg_input.value = 0;
            legError.style.display = "block";
            legError.style.animation = "none";
        }
        leg_input_animation_timer = setTimeout(() => {
            legError.style.animation = "fadeOut 2.0s forwards";
            leg_input_clear_timer = setTimeout(() => {
                legError.style.display = "none";
                legError.textContent = "";
            }, 0);
        }, 0);
    }, 1500);
}

document.getElementById("three-leg-input-box").addEventListener("input", validate_leg_input);
document.getElementById("four-leg-input-box").addEventListener("input", validate_leg_input);



let main_stage_timer;
let dim_clear_timer;
let dim_animation_timer;

function validate_stage_input() {
    clearTimeout(main_stage_timer);
    clearTimeout(dim_clear_timer);
    clearTimeout(dim_animation_timer);

    const dim_box_1 = document.getElementById("dimension-input-box-1");
    const dim_box_2 = document.getElementById("dimension-input-box-2");
    const dim_value_1 = Number(dim_box_1.value);
    const dim_value_2 = Number(dim_box_2.value);
    dimError = document.getElementById("dimension-input-error");

    main_stage_timer = setTimeout(() => {
        if (dim_value_1 % 4 !== 0) {
            dimError.textContent = "Dimension values must be a multiple of 4.";
            dim_box_1.value = Math.ceil(dim_value_1 / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
            check_all_boxes();
        }
        if (dim_value_2 % 4 !== 0) {
            dimError.textContent = "Dimension values must be a multiple of 4.";
            dim_box_2.value = Math.ceil(dim_value_2 / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
            check_all_boxes();
        }
        if (dim_value_1 < 8 && dim_box_1.value !== "") {
            dimError.textContent = "Please only enter values greater than or equal to 8.";
            dim_box_1.value = 8;
            dimError.style.display = "block";
            dimError.style.animation = "none";
            check_all_boxes();
        } 
        if (dim_value_2 < 8 && dim_box_2.value !== "") {
            dimError.textContent = "Please only enter values greater than or equal to 8.";
            dim_box_2.value = 8;
            dimError.style.display = "block";
            dimError.style.animation = "none";
            check_all_boxes();
        } 
        if (!Number.isInteger(dim_value_1)) {
            dimError.textContent = "Please only enter whole numbers.";
            dim_box_1.value = Math.floor(dim_box_1.value);
            dim_box_1.value = Math.ceil(dim_box_1.value / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
            check_all_boxes();
        } 
        if (!Number.isInteger(dim_value_2)) {
            dimError.textContent = "Please only enter whole numbers.";
            dim_box_2.value = Math.floor(dim_box_2.value);
            dim_box_2.value = Math.ceil(dim_box_2.value / 4) * 4;
            dimError.style.display = "block";
            dimError.style.animation = "none";
            check_all_boxes();
        }
        
        dim_animation_timer = setTimeout(() => {
            dimError.style.animation = "fadeOut 2.0s forwards";
            dim_clear_timer = setTimeout(() => {
                dimError.style.display = "none";
                dimError.textContent = "";
            }, 0)
        }, 0);
    }, 1500);
}

document.getElementById("dimension-input-box-1").addEventListener("input", validate_stage_input);
document.getElementById("dimension-input-box-2").addEventListener("input", validate_stage_input);





function create_grid_of_4x8_panels() {
    let dim1 = Number(document.getElementById("dimension-input-box-1").value);
    let dim2 = Number(document.getElementById("dimension-input-box-2").value);

    if (dim1%8==0 && dim2%8==0) {
        if (dim1 < dim2) {
            let temp = dim1;
            dim1 = dim2;
            dim2 = temp;
        }
    }
    else if (dim1%4==0 && dim2%8==0) {
        
    }
    else if (dim1%8==0 && dim2%4==0) {
        let temp = dim1;
        dim1 = dim2;
        dim2 = temp;
    }
    else
    {
        throw new Error("Dimensions are not multiples of 4 and 8.");
    }

    const panel_grid =[];
    const num_rows = dim2 / 8;
    const num_cols = dim1 / 4;
    for (let i = 0; i < num_rows; i++) {
        const row = [];
        for (let j = 0; j < num_cols; j++) {
            row.push("p");
        }
        panel_grid.push(row);
    }

    //const array_output = document.getElementById("stage-output-grid");
    //array_output.innerHTML = panel_grid.map(row => row.join(' ')).join('<br>');

    return panel_grid;
}


function drop_legs(panel_grid, three_leg_count, four_leg_count) {
    needed_four_legs = 0;
    needed_three_legs = 0;

    const num_rows = panel_grid.length;
    const num_cols = panel_grid[0].length;
    let current_row = 0;
    let current_col = 0;
    let stage_leg_grid = [];

    if (num_rows <= 0) {
        throw new Error("Could not drop legs: panel grid is empty.");
    }

    while (current_row < num_rows) {
        let new_row = [];

        current_col = 0;

        while (current_col < num_cols) {
            if (panel_grid[current_row].length - current_col < 2)
            {
                throw new Error("Could not drop legs: not enough rows to place legs.");
            }
            else if (panel_grid[current_row].length - current_col == 2) {
                if (three_leg_count > 0) {
                    new_row.push("t");
                    three_leg_count--;
                    needed_three_legs++;
                    current_col += 2;
                } 
                else {
                    throw new Error("Not enough three-legs available.");
                }
            }
            else if (panel_grid[current_row].length - current_col == 3) {
                if (four_leg_count > 0) {
                    new_row.push("f");
                    four_leg_count--;
                    needed_four_legs++;
                    current_col += 3;
                } 
                else {
                    throw new Error("Not enough four-legs available.");
                }
            }
            else if (panel_grid[current_row].length - current_col == 4)
            {
                if (three_leg_count > 0) {
                    new_row.push("t");
                    three_leg_count--;
                    needed_three_legs++;
                    current_col += 2;
                } 
                else {
                    throw new Error("Not enough three-legs available.");
                }
            }
            else if (panel_grid[current_row].length - current_col == 5) {
                if (num_rows == 1 && three_leg_count >= 2) {
                    new_row.push("t");
                    new_row.push("g");
                    three_leg_count -= 1;
                    needed_three_legs++;
                    current_col += 3;
                }
                else if (three_leg_count > 0 && four_leg_count > 0) {
                    new_row.push("f");
                    four_leg_count--;
                    needed_four_legs++;
                    current_col += 3;
                }
                else if (three_leg_count >= 2)
                {
                    new_row.push("t");
                    new_row.push("g");
                    three_leg_count -= 1;
                    needed_three_legs++;
                    current_col += 3;
                }
                else {
                    throw new Error("Not enough three-legs or four-legs available.");
                }
            }
            else if (panel_grid[current_row].length - current_col == 6) {
                if (three_leg_count > 0 && four_leg_count > 0) {
                    new_row.push("f");
                    new_row.push("g");
                    four_leg_count--;
                    needed_four_legs++;
                    current_col += 4;
                } 
                else if (four_leg_count >= 2) {
                    new_row.push("f");
                    four_leg_count -= 1;
                    current_col += 3;
                }
                else if (three_leg_count >= 3) {
                    new_row.push("t");
                    three_leg_count -= 1;
                    needed_three_legs++;
                    current_col += 2;
                }
                else {
                    throw new Error("Not enough three-legs or four-legs available.");
                }
            }
            else if (panel_grid[current_row].length - current_col == 7) {
                if (four_leg_count >= 2) {
                    new_row.push("f");
                    new_row.push("g");
                    four_leg_count -= 1;
                    needed_four_legs++;
                    current_col += 4;
                }
                else if (three_leg_count >= 3) {
                    new_row.push("t");
                    new_row.push("g");
                    three_leg_count -= 1;
                    needed_three_legs++;
                    current_col += 3;
                }
                else if (four_leg_count >0 && three_leg_count >=2) {
                    new_row.push("f");
                    four_leg_count -= 1;
                    needed_four_legs++;
                    current_col += 3;
                }
                else {
                    throw new Error("Not enough three-legs or four-legs available.");
                }
            }
            else if (panel_grid[current_row].length - current_col > 7) {
                if (four_leg_count > 0) {
                    new_row.push("f");
                    new_row.push("g");
                    four_leg_count -= 1;
                    needed_four_legs++;
                    current_col += 4;
                }
                else if (three_leg_count > 0) {
                    new_row.push("t");
                    new_row.push("g");
                    three_leg_count -= 1;
                    needed_three_legs++;
                    current_col += 3;
                }
                else {
                    throw new Error("Not enough three-legs or four-legs available.");
                }
            }
            else {
                throw new Error("Could not drop legs: unexpected panel grid length.");
            }
        }   
        stage_leg_grid.push(new_row);
        if (num_rows - current_row > 2) {
            let gap_row = [];
            for (let i = 0; i < new_row.length; i++) {
                gap_row.push("g");
            }
            stage_leg_grid.push(gap_row);
            current_row++;
        }
        current_row++;
    }


    return stage_leg_grid;
}

function assign_images(layout) {
    let four_leg_count = Number(document.getElementById("four-leg-input-box").value);
    let three_leg_count = Number(document.getElementById("three-leg-input-box").value);

    let image_layout = [];
    for (let i = 0; i < layout.length; i++) {
        image_layout_row = [];
        for (let j = 0; j < layout[i].length; j++) {
            if (layout[i][j] == "f") {
                image_layout_row.push(0);
                four_leg_count--;
            }
            else if (layout[i][j] == "t") {
                image_layout_row.push(1);
                three_leg_count--;
            }
            else if (layout[i][j] == "g") {
                if ((layout[i][j-1]=="f" || layout[i][j-1]=="t" || layout[i][j+1]=="f" || layout[i][j+1]=="t")) {
                    image_layout_row.push(8);
                }
                else if (layout[i-1][j] == "f") {
                    if (layout[i-1][j] == "f") {
                        image_layout_row.push(4);
                    }
                    else if (four_leg_count > 0) {
                        image_layout_row.push(0);
                        four_leg_count--;
                    }
                    else {
                        throw new Error("Not enough four legs available.");
                    }
                }
                else if (layout[i-1][j] == "t") {
                    if (layout[i+1][j] == "t") {
                        image_layout_row.push(5);
                    }
                    else if (three_leg_count > 0) {
                        image_layout_row.push(1);
                        three_leg_count--;
                    }
                    else {
                        throw new Error("Not enough three legs available.");
                    }
                }
                else {
                    image_layout_row.push(8);
                }
            }
            else {
                throw new Error("Unexpected value in layout: " + layout[i][j]);
            }
        }
        image_layout.push(image_layout_row);
    }

    return image_layout;
}

function set_arrow_height() {
    setTimeout(() => {
        const arrow = document.getElementById("vertical-arrow");
        const grid = document.getElementById("stage-output-grid");
        arrow.style.height = `${grid.offsetHeight}px`;
    }, 20);
}

function swap_dimensions(layout) {
    let new_layout = [];

    for (let row = 0; row < layout.length; row++) {
        for (let col = 0; col < layout[row].length; col++) {
            let current_value = layout[row][col];
            let new_value;

            switch (current_value) {
                case 0: new_value = 2; break;
                case 1: new_value = 3; break;
                case 2: new_value = 0; break;
                case 3: new_value = 1; break;
                case 4: new_value = 6; break;
                case 5: new_value = 7; break;
                case 6: new_value = 4; break;
                case 7: new_value = 5; break;
                case 8: new_value = 9; break;
                case 9: new_value = 8; break;
                case "p": new_value ="p"; break;
                default:
                    throw new Error("Could not swap dimensions. Given a bad value");
            }

            // Initialize the row if it doesn't exist
            if (!new_layout[col]) {
                new_layout[col] = [];
            }

            new_layout[col][row] = new_value;
        }
    }

    return new_layout;
}

function draw_swapped_layout() {
    let panel_grid = current_panel_grid;
    console.table(panel_grid);
    panel_grid = swap_dimensions(panel_grid);
    console.table(panel_grid);
    current_panel_grid = panel_grid;

    let layout = swap_dimensions(current_layout);
    current_layout = layout;

    let output_grid = document.getElementById("stage-output-grid");
    output_grid.innerHTML = "";

    for (let i = 0; i < layout.length; i++) {
        // Create a row container for this row
        let row = document.createElement("div");
        row.classList.add("stage-row");
        row.style.display = "grid";
        row.style.gridTemplateColumns = `repeat(${panel_grid[0].length}, 1fr)`;

        for (let j = 0; j < layout[i].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("stage-cell");

            let img = document.createElement("img");
            img.className = "diagram-image";
            img.src = `images/${layout[i][j]}.png`;

            // Determine column span
            if (layout[i][j] == 0 || layout[i][j] == 4) {
                cell.style.gridColumn = "span 3";
            } else if (layout[i][j] == 1 || layout[i][j] == 5) {
                cell.style.gridColumn = "span 2";
            } else {
                cell.style.gridColumn = "span 1";
            }

            cell.appendChild(img);
            row.appendChild(cell);
        }

        output_grid.appendChild(row); // Add the full row
    }

    set_arrow_height();

    let temp;
    temp = current_length
    current_length = current_width;
    current_width = temp;

    document.getElementById("stage-dim-horizontal").innerText = current_length + " ft";
    document.getElementById("stage-dim-vertical").innerText = current_width + " ft";
}


document.getElementById("swap-button").addEventListener("click", draw_swapped_layout);

function make_diagram() {
    try {
        panel_grid = create_grid_of_4x8_panels();
        current_panel_grid = panel_grid;

        let layout = drop_legs(
            panel_grid,
            Number(document.getElementById("three-leg-input-box").value),
            Number(document.getElementById("four-leg-input-box").value)
        );

        layout = assign_images(layout);
        current_layout = layout;

        let output_grid = document.getElementById("stage-output-grid");
        output_grid.innerHTML = "";

        for (let i = 0; i < layout.length; i++) {
            const row = document.createElement("div");
            row.className = "stage-row";
            row.style.display = "grid";
            row.style.gridTemplateColumns = `repeat(${panel_grid[0].length}, 1fr)`;

            for (let j = 0; j < layout[i].length; j++) {
                let cell = document.createElement("div");
                cell.classList.add("stage-cell");

                let img = document.createElement("img");
                img.className = "diagram-image";
                img.src = `images/${layout[i][j]}.png`;

                if (layout[i][j] == 0 || layout[i][j] == 4) {
                    cell.style.gridColumn = "span 3";
                } else if (
                    layout[i][j] == 1 || layout[i][j] == 5 ||
                    layout[i][j] == 2 || layout[i][j] == 3 ||
                    layout[i][j] == 6 || layout[i][j] == 7 ||
                    layout[i][j] == 9
                ) {
                    cell.style.gridColumn = "span 2";
                } else {
                    cell.style.gridColumn = "span 1";
                }

                cell.appendChild(img);
                row.appendChild(cell);
            }

            output_grid.appendChild(row);

            document.getElementById("three-leg-info-output").innerText = needed_three_legs;
            document.getElementById("four-leg-info-output").innerText = needed_four_legs;

            show_diagram();
        }

        let length_value = Number(document.getElementById("dimension-input-box-1").value);
        let width_value = Number(document.getElementById("dimension-input-box-2").value);
        if (length_value%8==0 && width_value%8==0 && width_value>length_value)
        {   
            current_length = width_value;
            current_width = length_value;
            draw_swapped_layout();
        }
        else if (length_value%8==0 && width_value%4==0 && width_value%8!=0) {
            current_length = width_value;
            current_width = length_value;
            draw_swapped_layout();
        }
        else
        {
            current_length = length_value;
            current_width = width_value;

            document.getElementById("stage-dim-vertical").innerText = width_value += " ft";
            document.getElementById("stage-dim-horizontal").innerText = length_value += " ft";
        }

        set_arrow_height();

        document.getElementById("stage-dimensions-info-output").innerText = `${current_length} ft x ${current_width} ft`;
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    }
    catch (error) {
        console.error("Error generating diagram:", error);
        document.getElementById("calculate-error").textContent = "Error generating diagram: " + error.message;
        document.getElementById("calculate-error").style.display = "block";
        document.getElementById("calculate-error").style.animation = "none";
        hide_diagram();
    }
}



document.getElementById("calculate-button").addEventListener("click", make_diagram);




function show_dimensions() {
    const stageDimVertical = document.getElementById("stage-dim-vertical");
    const stageDimHorizontal = document.getElementById("stage-dim-horizontal");
    const verticalArrow = document.getElementById("vertical-arrow");
    const horizontalArrow = document.getElementById("horizontal-arrow");

    stageDimVertical.style.display = "block";
    stageDimHorizontal.style.display = "block";
    verticalArrow.style.display = "block";
    horizontalArrow.style.display = "block";
}

function hide_dimensions() {
    const stageDimVertical = document.getElementById("stage-dim-vertical");
    const stageDimHorizontal = document.getElementById("stage-dim-horizontal");
    const verticalArrow = document.getElementById("vertical-arrow");
    const horizontalArrow = document.getElementById("horizontal-arrow");

    stageDimVertical.style.display = "none";
    stageDimHorizontal.style.display = "none";
    verticalArrow.style.display = "none";
    horizontalArrow.style.display = "none";
}

dimensionCheckbox.addEventListener("change", function() {
    if (dimensionCheckbox.checked) {
        show_dimensions();
    }
    else {
        hide_dimensions();
    }
});

function print_diagram() {
    document.getElementById("vertical-arrow").style.height = "auto";
    window.print();
}

document.getElementById("print-button").addEventListener("click", print_diagram)

window.addEventListener("resize", set_arrow_height);