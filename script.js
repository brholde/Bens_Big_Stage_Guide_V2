function check_all_boxes () {
    const three_leg_input = document.getElementById("three-leg-input-box");
    const four_leg_input = document.getElementById("four-leg-input-box");
    const dim_box_1 = document.getElementById("dimension-input-box-1");
    const dim_box_2 = document.getElementById("dimension-input-box-2");
    const dim_value_1 = Number(dim_box_1.value);
    const dim_value_2 = Number(dim_box_2.value);
    const allGood = true;

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
    const dim1 = Number(document.getElementById("dimension-input-box-1").value);
    const dim2 = Number(document.getElementById("dimension-input-box-2").value);

    if (dim1%4==0 && dim2%8==0) {
        
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

    const array_output = document.getElementById("stage-output-grid");
    array_output.innerHTML = panel_grid.map(row => row.join(' ')).join('<br>');
}


function drop_legs() {
    
}

document.getElementById("calculate-button").addEventListener("click", create_grid_of_4x8_panels);