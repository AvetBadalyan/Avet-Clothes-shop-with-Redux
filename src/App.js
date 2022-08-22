import { categories } from "./categories";
import "./categories.styles.scss";
import CategoryItem from "./Components/CategoryItem/CategoryItem";

function App() {
  return (
    <div className="categories-container">
      {categories.map(({ title, id, imageUrl }) => (
        <CategoryItem key={id} title={title} imageUrl={imageUrl} />
      ))}
    </div>
  );
}

export default App;
