/**
 * 享元模式：这个模式很重要：
 * 作用用于减少内存占用；
 * 方式： 1. 减少创建对象实例的数量
 *       2. 运用共享技术来有效支持大量细粒度的对象
 */
// 以图书管理系统为例子:每本书都有以下特性：
/**
 * ID,Title,Author,Genre,Page count,Publisher ID,ISBN
 * 同时需要以下属性来追踪每一本书时，记录它是否可用，归还时间等，
 * - checkoutDate
 * - checkoutMember
 * - dueReturnDate
 * - availbility
 */
var Book = function( id, title, author, genre, pageCount,publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate,availability ){
  this.id = id;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.publisherID = publisherID;
  this.ISBN = ISBN;
  this.checkoutDate = checkoutDate;
  this.checkoutMember = checkoutMember;
  this.dueReturnDate = dueReturnDate;
  this.availability = availability;
};

Book.prototype = {
 getTitle: function () {
    return this.title;
 },
 getAuthor: function () {
    return this.author;
 },
 getISBN: function (){
    return this.ISBN;
 },
 // For brevity, other getters are not shown
 updateCheckoutStatus: function( bookID, newStatus, checkoutDate, checkoutMember, newReturnDate ){
    this.id = bookID;
    this.availability = newStatus;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = newReturnDate;
 },
 extendCheckoutPeriod: function( bookID, newReturnDate ){
     this.id = bookID;
     this.dueReturnDate = newReturnDate;

 },
 isPastDue: function(bookID){
    var currentDate = new Date();
    return currentDate.getTime() > Date.parse( this.dueReturnDate );
  }
};


/**
 * 上面看上去是常规解法，只是当图书增多时，对于系统的压力会逐渐增多。
 * 为此我们将书的属性分为两种：本身固有的和外在特性。
 * 本身固有的属性包括title,author等，
 * 外在特性包括checkoutMember,dueReturnDate等。
 */
// 因此将外在特征删除，checkoutDate等等信息会被移动到一个新的类中，一个新的工厂函数如下：

// Book Factory singleton
// 在这个工厂函数中，我们将会检查当前需要创建的书籍是否已经存在，如果存在直接返回书实例；
// 否则进行调用 Book 构造函数进行创建。这保证了所有的书都是唯一的，而不存在重复。
var BookFactory = (function(){
  // existingBooks 是以ISBN为key的对象
  var existingBooks = {},existingBook
  return {
    createBook:function(title,author,genre,pageCount,publisherID,ISBN){
      existingBook = existingBooks[ISBN]
      if(!!existingBook){
        return existingBook
      }else{
        var book = new Book(title,author,genre,pageCount,publisherID,ISBN)
        existingBooks[ISBN] = book
        return book
      }
    }
  }
})()

// 对于数的外在特性，我们创建BookRecordManager 来维护每一本书的状态，
// 并通过bookId与每一本书进行关系创建：
var BookRecordManager = (function(){
  var bookRecordDatabase = {}
  return {
    // add a new book into the libarary system
    addBookRecord: function ( id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability ) {
      var book = BookFactory.createBook( title, author, genre, pageCount, publisherID, ISBN );
      bookRecordDatabase[id] = {
        checkoutMember: checkoutMember,
        checkoutDate: checkoutDate,
        dueReturnDate: dueReturnDate,
        availability: availability,
        book: book
      };
    },
    updateCheckoutStatus:function(bookID,newStatus,checkoutDate,checkoutMember,newReturnDate){
      var record = bookRecordDatabase[bookID]
      record.availability = newStatus
      record.checkoutDate = checkoutDate
      record.checkoutMember = checkoutMember
      record.dueReturnDate = newReturnDate
    },
    extendCheckoutPeriod:function(bookID,newReturnDate){
      bookRecordDatabase[bookID].dueReturnDate = newReturnDate
    },
    isPasDue:function(bookID){
      var currentDate = new Date()
      return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate)
    }
  }
})()

/**
 * 书目所有的外在特性都被从书本身的特性中抽离，现被移动到BookManager的BookDatabase当中。
 * 对于书借入/借出的操作也移动到了BookRecordManager 当中，因为这些方法需要直接操作书的外在特性。
 * 如此看来,比一本书拥有多项属性的大object模式更加高效，也有利于维护。
 *
 * 从性能角度来看：如果有30本一样的书（这里的一样指的是ISBN）,现在的模式下只存储一个实例。
 *  同时对于书状态转移的函数，我们维护在BookManager当中，而不再出现在对象(原型)上，
 * 如果这些函数出现在每一个书实例当中，将会是更大的开销。
 * 用时间换空间
 */


/**
 * 代理模式: 
 * 使用场景：对函数的返回结果进行缓存
 */
const getCacheProxy = (fn, cache = new Map())=>
  new Proxy(fn,{
    apply(target,context,argss){
      const argsString = [...args].join()
      if(cache.has(argsString)){
        return cache.get(argsString)
      }
      const result = fn(...args)
      cache.set(argsString,result)
      return result
    }
  })
