

export default function TableRow() {
  const data = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
  ];
  
  const idToFetch = 2;
  
  const filteredData = data.filter((item) => item.id === idToFetch);
  
  console.log(filteredData);

  return (
    <div >
      tekan saya
    </div>
  );
}
