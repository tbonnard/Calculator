document.addEventListener('DOMContentLoaded', function (){

    let nbA;
    let nbB;
    let nbC='';
    let calc ='';
    let number=0;
    let eq =0;
    
    const screen = document.querySelector('.screen');

    document.querySelectorAll('.button').forEach(btn => {
       btn.addEventListener('click', () => {
       
           if (btn.dataset.number) {
                if(screen.textContent == '0' && calc == '')
                    screen.textContent = btn.dataset.number;

                else if (number==1) {
                    nbB = btn.dataset.number;
                    screen.textContent = nbB;
                    number=2;
                    console.log(`numb = 1 -- number: ${number}`);
                    console.log(`numb = 1 -- nbc: ${nbC}`);
                    console.log(`numb = 1-- eq: ${eq}`);
                }

                else if(nbC!='' ) {
                    nbA = screen.textContent;
                    nbC='';
                    screen.textContent = btn.dataset.number;
                    number=2;

                    console.log(`nbc! -- number: ${number}`);
                    console.log(`nbc! -- nbc: ${nbC}`);
                    console.log(`nbc!-- eq: ${eq}`);
                }

                else {screen.append(btn.dataset.number);
                }
            }

           else if (btn.dataset.point) {
                const p = '.'; 
                let a = [];
                for(let i=0; i<screen.textContent.length; i++) {
                    if(p == screen.textContent[i]) {a+=i} 
                }
                if (a == 0) {screen.append(p);}  
            }

            else if (btn.dataset.info) {
                switch(btn.dataset.info) {
                    case 'clear':
                        clear();
                        break;
                    case 'remove':
                        let a = screen.textContent
                        b = a.substring(0, a.length - 1);
                        screen.textContent = b;
                        reset();
                        break;
                
                }
            }

            else if (btn.dataset.equal) {
                if (!btn.dataset.calc) {
                    eq = 1;
                    nbB = screen.textContent;
                    calculation(btn.dataset.calc);
                }
            }

           else {
               
                if (number == 0) {
                    calc = btn.dataset.calc;
                    nbA = screen.textContent;
                    number = 1;
                    console.log(`before calc -- number: ${number}`);
                    console.log(`before calc-- nbc: ${nbC}`);
                    console.log(`before calc-- eq: ${eq}`);

                }



                else if (eq==1) {
                    calc = btn.dataset.calc;
                    nbA = screen.textContent;
                    number = 1;
                    eq=0;
                }

                else {
                    nbB = screen.textContent;
                    calculation(btn.dataset.calc);
                } 
            }
       }); 
    });


    function clear() {
        nbA='';
        nbB='';
        nbC='';
        calc='';
        number=0;
        screen.textContent = 0;
    }

    function reset() {
        if (screen.textContent == '') {screen.textContent = 0}
    }

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

            function updateScreen(nbC) {
                screen.textContent = nbC;
                calc = operator;
                equal(calc);
                console.log(`cal -- number: ${number}`);
                console.log(`cal -- nbc: ${nbC}`);
                console.log(`calc-- eq: ${eq}`);

            }  
    }


    function equal(operator) {
        if (eq == 1) {
            calc = operator;
            nbA = screen.textContent;
            number = 1;
            nbC = "";
            console.log(`equ - number: ${number}`);
            console.log(`equ - nbc: ${nbC}`);
            console.log(`equ - eq: ${eq}`);

        }
    }

       
});

