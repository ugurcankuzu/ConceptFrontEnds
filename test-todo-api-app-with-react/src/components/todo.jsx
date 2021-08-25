import React from 'react'
import './todo.css'

export default class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    // Component Mount Edildikten sonra MongoDB ile iletişim kuran API'mize Get Request atıp databaseteki tüm todoları çekiyoruz.
    fetch('http://localhost:5000/todos', { method: 'GET', redirect: 'follow' })
      .then((res) => res.json()) //Sonrasında aldığımız cevaba res diyerek bunu json() ile object Promise'e çevirip bir sonraki then()'de obje olarak karşılıyoruz.
      .then((
        todos, //İlk etapta elimizde tüm objeleri içeren tek bir obje olduğundan map fonksiyonu ile bu objenin içindekiler üzerinde dolaşıyoruz
      ) =>
        todos.map(
          (
            todo, //Üzerinde bulunduğumuz her bir objeyi todo olarak adlandırıp setState ile state.data adlı state arrayini güncelliyoruz.
          ) => this.setState({ data: this.state.data.concat(todo) }), // Bu güncelleme için .concat() fonksiyonunu kullanarak mevcut arrayin içine todo objesini koyup yeni bir array elde edip onu tekrar state.data arrayine atıyoruz.
        ),
      )
  }

  render() {
    return (
      <>
        <div className="main">
          {
            // this.state.data'daki array üzerinde .map() fonksiyonu ile dolaşıyoruz ve state.data'daki her obje için kullanılacak ortak bir layout hazırlıyoruz.
            this.state.data.map((todo) => (
              <div className="entry">
                <h1>{todo.title}</h1>
                <p>{todo.note}</p>
                <button
                  onClick={() => {
                    //Delete Request Fonksiyonu

                    fetch(`http://localhost:5000/todos/${todo._id}`, {
                      method: 'DELETE',
                      redirect: 'follow',
                    }) // -> MongoDB ile İletişim Kurduğumuz API'ye delete requesti atar.
                      .then(
                        this.setState({
                          data: this.state.data.filter(
                            (stateArrayIterator) =>
                              stateArrayIterator._id != todo._id,
                          ),
                        }),
                      ) // -> Sonrasında this.setState ile state.data'yı güncelliyoruz.
                    //ve bu güncellemede state.dataya yeni değer olarak önceki state.data arrayinin elemanlarının(burada filter fonksiyonunda stateArrayIterator olarak adlandırdık) idlerini
                    //butonun ait olduğu objenin(burada .map() fonksiyonundan gelen todo değişkeni) id'si ile karşılaştırıp filtre ediyoruz. İki id karşılaştırmada eşleşiyorsa yeni array'e alınmıyor.
                    //filter fonksiyonu sonucunda yeni bir array oluşuyor ve biz bunu direkt setState içerisinde tekrar state.data'ya atamış oluyoruz.

                    //Burada api'dan delete atmamıza rağmen state.arrayden filtre etmemizin sebebi, başta apiden alınan todoları state.dataya atayıp oradan güncellememizdir.
                  }}
                >
                  <i class="fas fa-check"></i>
                </button>
              </div>
            ))
          }
        </div>
        <button
          className="add"
          onClick={() => {
            document.getElementById('newTodo').style.display = 'flex'
          }}
        >
          <i class="fas fa-plus"></i>
        </button>
        <div id="newTodo" className="newTodo">
          <h1>Let's plan something for you!</h1>
          <input
            id="title"
            className="ifield"
            placeholder="How would you call your plan ?"
          ></input>
          <input
            id="note"
            className="note"
            placeholder="Now, You can write details right here"
          ></input>
          <button
            onClick={() => {
              var userTitle = document.getElementById('title').value;
              var userNote = document.getElementById('note').value;
              //POST Request ile Data Ekleme
              fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                },
                body: JSON.stringify({
                  title: userTitle,
                  note: userNote,
                }),
              }).then((res) => {
                if (res.status == 200) {
                  document.getElementById('newTodo').style.display = 'none'
                  this.setState({data: []});
                  this.componentDidMount();
                }
              })
            }}
            className="send"
          >
            Add to your Todo List
          </button>
        </div>
      </>
    )
  }
}
