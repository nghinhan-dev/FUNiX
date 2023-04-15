export default function SearchForm() {
  return (
    <form id="search" action="#">
      <div>
        <i className="fa fa-map-marker-alt"></i>
        <input type="text" placeholder="Where are you going?" />
      </div>
      <div>
        <i className="fa fa-calendar-alt"></i>
        <input type="text" placeholder="16/04/2023 to 16/04/2023" />
      </div>
      <div>
        <i className="fa fa-child"></i>
        <input type="text" placeholder="1 adult &#183; 1 child &#183; 1 room" />
      </div>
      <button className="btn">Search</button>
    </form>
  );
}
