Q1: 为什么要三次握手呢？

举例：已失效的连接请求报文段。

client 发送了第一个连接的请求报文，但是由于网络不好，这个请求没有立即到达服务端，而是在某个网络节点中滞留了，直到某个时间才到达server，本来这已经是一个失效的报文，但是server端接收到这个请求报文后，还是会想client发出确认的报文，表示同意连接。假如不采用三次握手，那么只要server发出确认，新的建立就连接了，但其实这个请求是失效的请求client是不会理睬server的确认信息，也不会向服务端发送确认的请求，但是server认为新的连接已经建立起来了，并一直等待client发来数据，这样 server的很多资源就没白白浪费。



Q2：tcp三次握手过程？

TCP有6种标识：

- SYN（建立联机）
- ACK（确认）
- PSH（传送）
- FIN（结束）
- RST（重置）
- URG（紧急）

![tcp1.png](E:\yangsuRecord\NetWork\tcp1.png)

**第一次握手**mediapig

```
客户端向服务器发出连接请求报文，这时报文首部中的同步位SYN=1,同时随机生成初始序列号 seq =x（为了保证不重复，可靠连接），此时，tcp客户端进程进入SYN-SENT（同步已发送状态）。tcp规定，SYN报文段（SYN =1）不能携带数据，但需要消耗掉一个序号。
这个三次握手中的开始。表示客户端想要和服务端建立连接。
```

**第二次握手**

```
tcp服务器收到请求报文后，如果同意连接，则发出确认报文。确认报文中应该ACK=1,SYN=1,确认号是ack=x+1，同时也要为自己随机初始化一个序列号seq=y，此时，tcp服务器进入了SYN-RCVD（同步收到）状态。这个报文也不能携带数据，但是同样要消耗一个序号。这个报文带有SYN（建立连接）和ACK（确认）标志，询问客户端是否准备好。
```

**第三次握手**

```
tcp客户进程收到确认后，还要向服务器给出确认。确认报文的ACK=1,ack=y+1。此时，tcp连接建立，客户端进入ESTABLISHED（已建立连接）状态。tcp规定，ACK报文段可以携带数据，但是如果不携带数据则不消耗序号。这里客户端表示我已经准备好。
```



Q4：四次挥手过程

![](E:\yangsuRecord\NetWork\tcp2.png)



**第一次挥手**

```
tcp发送一个FIN（结束），用来关闭客户到服务端的连接。客户端进程发出连接释放报文，并且停止发送数据。释放数据报文首部，FIN=1，其序列号为seq=u（等于前面已经传送过来的数据最后一个字节的序号+1）。此时，客户端进入FIN-WAIT-1（终止等待1）状态。TCP规定，FIN报文段即使不携带数据，也要消耗一个序号。
```

**第二次挥手**

```
服务端收到这个FIN，他发回一个ACK（确认），确认收到序号+1，和SYN一样，一个FIN将占用一个序号。服务器收到连接释放报文，发出确认报文，ACK=1,ack=u+1，并且带上自己的序列号seq=v，此时，服务端就进入了CLOSE-WAIT（关闭等待）状态。tcp服务器通知高层的应用进程，客户端向服务器的方向就释放了，这时候处理半关闭
```

**第三次挥手**

```
服务端发送一个FIN（结束）到客户端，服务端关闭客户端的连接。
服务器将最后的数据发送完毕后，就向客户端发送连接释放报文，FIN=1,ack=u+1，由于在半关闭状态，服务器很可能又发送了一些数据，假定此时的序列号为seq = w，此时，服务器就进入了LAST-ACK（最后确认）状态，等待客户端的确认。
```

**第四次挥手**

```
客户端发送ACK（确认）报文确认，并将确认的序号+1，这样关闭完成。
客户端收到服务器的连接释放报文后，必须发出确认，ACK=1,ack=w+1,而自己的序列号是seq=u+1，此时，客户端就进入了TIME-WAIT（时间等待）状态。
注意此时TCP连接还没释放，必须经过2*MSL（最长报文段寿命）的时间后，当客户端撤销相应的TCB（传输控制块）后，才进入CLOSED状态。
```



Q5：为什么是4次挥手？

```
为了确保数据能够完成传输。
关闭连接时，当收到对方的FIN报文通知时，它仅仅表示对方没有数据发送了；但未必所有的数据都全部发送给对方了，所以你可以未必会马上会关闭SOCKET，也即你可能还需要发送一些数据给对方之后，再发送FIN报文给对方来表示你同意现在可以关闭连接了，所以它这里的ACK报文和FIN报文多数情况都是分开发送。
可能有人会有会问，凭什么三次握手时ACK（确认）和SYN（建立连接）是一起发送。挥手的时候为什么是分开的时候发送呢。
因为当server端收到client端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。但是关闭连接时，当server端收到FIN报文时，很可能并不会立即关闭SOCKET，所以只能先回复一个ACK报文，我才能发送FIN报文，因此不能发送。故需要四步挥手。
```

Q6：客户端如果突然挂掉怎么办？

```
正常连接时，如果客户端突然挂掉，如果没有措施处理这种情况，就会出现客户端和服务端出现长时期的空闲。解决办法是在服务器端设置保活计时器，每当服务器收到客户端的消息时，就将计时器复位。超时时间通常设置为2小时。若服务器超过2小时没收到客户的信息，他就发送探测报文段。若发送了10个探测报文段，每一个相隔75s，还没有响应就认为客户端出了故障，因而终止该连接。
```

Q7:TCP和UDP的区别

- 基于连接与无连接；UDP是无连接的，即发送数据之前不需要建立连接
- tcp保证数据正确性，udp可能丢包，tcp保证数据顺序，udp不保证。也就是说，通过tcp连接传送的数据，无差错，不丢失，不重复，且按序到达；udp尽最大努力交付，即不保证可靠交付。tcp通过校验，重传控制，序号表示，滑动窗口，确认应答实现可靠传输。如丢包时的重发控制，还可以对次序乱掉的分包进行顺序控制。
- udp具有较好的实时性，工作效率比tcp高，适用于对高速传输和实时性有较高的通信或广播通信。
- 每一条tcp连接只能是点到点的，udp支持一对一，一对多，多对一和多对多的交互通信。
- tcp对系统资源要求较多，udp对系统资源要求较少。

