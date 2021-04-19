document.addEventListener('DOMContentLoaded', function (){

    let nbA;
    let nbB;
    let nbC='';
    let calc ='';
    let number=0;
    let eq =0;
    let directAfter=false;

    //function to validate numbers
  function check(info) {
    console.log(`${info} -- nba: ${nbA}`);
    console.log(`${info} -- nbb: ${nbB}`);
    console.log(`${info} -- nbc: ${nbC}`);
    console.log(`${info} -- calc: ${calc}`);
    console.log(`${info} -- number: ${number}`);
    console.log(`${info} -- eq: ${eq}`);
    console.log(`${info} -- direct: ${directAfter}`);
    console.log(`${screen.textContent}`);

  }
    const screen = document.querySelector('.screen');

    document.querySelectorAll('.button').forEach(btn => {
       btn.addEventListener('click', () => {
       
        // at first, replace the 0 by the number
           if (btn.dataset.number) {
                if(screen.textContent == '0') {
                    screen.textContent = btn.dataset.number;
                    directAfter = false; 
                }

                // to replace the previous number by a new one, when user clicks on an operator, to start a new number
                else if (number==1) {
                    nbB = btn.dataset.number;
                    screen.textContent = nbB;
                    number=2;
                    directAfter = false;
                    //check('numb=1');
                }

                else if(nbC!='' ) {
                    nbA = screen.textContent;
                    nbC='';
                    screen.textContent = btn.dataset.number;
                    number=2;
                    directAfter = false;

                }
                // to enter max 9 numbers
                else if (screen.textContent.length <=9) 
                    {
                    screen.append(btn.dataset.number);
                    directAfter = false;
                    //check("add numb");                    
                }
            }

            // check if there's already a point or not
           else if (btn.dataset.point) {
                nbC='';
                const p = '.'; 
                let a = [];
                for(let i=0; i<screen.textContent.length; i++) {
                    if(p == screen.textContent[i]) {
                        a+=i
                    } 
                }
                // check if poinjt right after an operator, to start a new number
                if (directAfter) {
                    screen.textContent = '0.';
                    directAfter = false;
                    number=2;  
                                 
                }
                else if (a.length == 0) {
                    screen.append(p); 
                }
              // check("avec points");

            }

            // call clear function  or remove elements
            else if (btn.dataset.info) {
                switch(btn.dataset.info) {
                    case 'clear':
                        clear();
                        break;
                    case 'remove':
                        let a = screen.textContent;
                        b = a.substring(0, a.length - 1);
                        screen.textContent = b;
                        reset();
                        break;
                
                }
            }
            
            // calculate if equal
            else if (btn.dataset.equal) {
                   // check("equ mais ! calc");
                    eq = 1;
                    nbB = screen.textContent;
                    directAfter = true;
                    calculation(btn.dataset.calc);
                }
           


           else {
               // first time user clicks on an operator
                if (number == 0 ) {
                    calc = btn.dataset.calc;
                    nbA = screen.textContent;
                    number = 1;
                    directAfter = true;
                    //check("before calc");

                }
                // if user already used the equal, that alows the user to enter another number without calculating rigth away because we need another  number to calculate with the previous result
                else if (eq==1) {
                    calc = btn.dataset.calc;
                    nbA = screen.textContent;
                    number = 1;
                    eq=0;
                    directAfter=true;
                }
                
                // when needs to calculate
                else {
                    //check("calc mais pre function calc");
                    nbB = screen.textContent;
                    calculation(btn.dataset.calc);
                } 
            }
       }); 
    });

// function to  clear elements
    function clear() {
        nbA='';
        nbB='';
        nbC='';
        calc='';
        number=0;
        directAfter = false;
        screen.textContent = 0;
        //check("clear");

    }

    // function to display a '0' if user removes all elements
    function reset() {
        if (screen.textContent == '') {screen.textContent = 0}
    }

    // calculate elements
    function calculation(operator) {
            try{
                switch(calc) {
                    case "mult":
                        nbC = parseFloat(nbA)*parseFloat(nbB);
                        updateScreen(nbC);
                        break;
                    case "minus":
                        nbC = parseFloat(nbA)-parseFloat(nbB);
                        updateScreen(nbC);
                        break;
                    case "add":
                        nbC = parseFloat(nbA)+parseFloat(nbB);
                        updateScreen(nbC);
                        break;
                    case "div":
                        if (nbB == 0) {
                            clear();
                            throw new Error("can not divide by 0. Start over.");
                        } else { 
                            nbC = parseFloat(nbA)/parseFloat(nbB);
                            updateScreen(nbC);
                        }
                        break;
                }
            }

            catch (error) {
                {alert(error)}
            }

            // displaying result on the screen
            function updateScreen(nbC) {
                screen.textContent = nbC;
                nbA = nbC;
                nbB = '';
                nbC = '';
               // check("juste apres nbc = ");
                calc = operator;
                equal(calc);
                directAfter=true;
                //check("dans update screen");

            }  
    }

// allow to enter another number
    function equal(operator) {
        if (eq == 1) {
            calc = operator;
            nbA = screen.textContent;
            number = 1;
            nbC = "";
            //check("equ");
        }
    }

       
});

