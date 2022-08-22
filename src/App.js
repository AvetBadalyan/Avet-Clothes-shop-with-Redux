import { categories } from "./categories";
import "./categories.styles.scss";
import CategoryItem from "./Components/CategoryItem/CategoryItem";

function App() {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
