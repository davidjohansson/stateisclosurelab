Closure: en inre funktion stänger över (closes over) en variabel i det yttre scopet när den exporteras. Se closure.js.
Den skapar ett hölje (closure) av variabeln och funktionen, typ
```
{
    variables: {a: "I am a value}
    function: theFunctionCallingA
}
```

```
function ReactItself(){
   
    const closedOverVariable = "I'm in outer!"

    const inner = function CompWithState(){
        console.log(closedOverVariable);
    }

    return inner;
}

const fnction = ReactItself();
//Prints "I'm in outer!"
fnction();
```

När sedan funktionen anropas utanför det yttre scopet finns värdet för variabeln a kvar.

I react sker detta genom `useState`-hooken. `useState`-variablen finns egentligen inte definierad inuti komponenten (funktionen) utan i något omgivande scope. När komponenten anropas anropas den med `useState`-variabeln, som om den vore en parameter. Den är inte lokal för funktionen, och är inte alls magisk när den används inne i komponenten, utan bara sitt fixa värde. Det förklarar varför
1. man inte kan mutera den direkt utan måste använda `useState`-setmetoden
2. varför det heter hooks - det är en krok in i något utanför funktionen själv, in i dess hölje

```
function App() {
  const [closedOverVariable, setClosedOverVariable] = useState(0)
  return (
    <h1>{closedOverVariable}</h1>
    
  );
}

export default App;

```
`closedOverVariable` här är definierad utanför den här funktionen, det finns en omgivande funktion som har dess värde. När det ändras mha `setClosedOverVariable` anropas funktionen igen.

Det finns ytterligare en nivå av closure, utöver själva statehanteringen: en eventhanterare eller `useEffect`-hook som använder `closedOverVariable` kommer också stängas över `closedOverVariable` - det värde som `closedOverVariable` har när den omgivande funktionen renderas blir exakt det värde som kommer användas i eventhanteraren eller `useEffect`. Båda dessa har det gemensamt att de exekveras senare, efter att funktionen som nu kör har kör klart, så när en komponent renderas skapas ett closure med statevariabeln  och eventhanteraren/useEffect-hooken:

```
function Counter() {
  const [count, setCount] = useState(0);
  
  function handleAlertClick() { 
       setTimeout(() => {  
          alert('You clicked on: ' + count); 
           }, 3000);  }

  return (
    <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>
    Click me
    </button>
    <button onClick={handleAlertClick}>        Show alert      </button>    </div>
    );
  }

  export default Counter
  ```

  om man här klickar tre ggr på Click me, sedan på Show alert, sedan snabbt igen på Click me, kommer Show alert att visa 3.
