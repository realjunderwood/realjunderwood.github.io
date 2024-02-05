<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple React App</title>


</head>
<body>

<div id="root"></div>


<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>







<script type="text/babel">
function Counter() {
  // Using the useState hook to initialize and manage the state
  const [count, setCount] = useState(0);

  // Event handler to update the state when the button is clicked
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
</script>

</body>
</html>
