import React from "react";
import ReactPaginate from "react-paginate";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      offset: 0,
      postData: [],
      perPage: 20,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    if (window.sessionStorage.getItem("current")) {
      console.log("llll: ", window.sessionStorage.getItem("current"));
      // const offset = window.sessionStorage.getItem('current') * this.state.perPage;
      this.setState(
        {
          currentPage: parseInt(window.sessionStorage.getItem("current")),
          // offset: offset
        },
        () => {
          this.receivedData(this.state.currentPage + 1);
        }
      );
    } else {
      this.receivedData(this.state.currentPage + 1);
    }
  }
  receivedData(pagecount) {
    const requestOptions = {
      method: "POST",
    };
    fetch(
      "http://nyx.vima.ekt.gr:3000/api/books?page=" +
        pagecount +
        "&itemsPerPage=20",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => {
        //const data = res.books;
        const slice = res.count / this.state.perPage;
        //console.log("data: ",slice);
        const postData = res.books.map((pd, index) => (
          <li key={index}>{pd.book_title}</li>
        ));

        this.setState({
          pageCount: slice,

          postData,
        });
      });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData(selectedPage + 1);
        console.log("currentPage: ", this.state.currentPage);
        window.sessionStorage.setItem("current", this.state.currentPage);
      }
    );
  };

  render() {
    return (
      <div>
        <h1>Book List</h1>
        <ul className="page-list">{this.state.postData}</ul>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          forcePage={this.state.currentPage}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}
export { Home };
