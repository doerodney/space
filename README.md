# space
Communication model between N producers and one consumer.

## Summary
There are two examples of communication in this package.
### TCP Socket-Based Solution
client.py, protocol.py, and server.py implement a TCP socket-based
solution.  This solution uses multi-threading in the server to
enable it to service multiple clients.  This solution could be
fussier at run time and may not scale up to the data rates
required.  All the limitations imposed by the Python Global
Interpreter Lock (GIL) apply.  [Sarker] has a great explanation of
the implications of the GIL.

To demonstrate the TCP socket solution:
*   Start a shell and run server.py.
*   Start one or more shells and run client.py.  Messages
 typed into the prompt are transmitted to the server.py instance.

To implement a test bench, implement sensors as specializations of
client.py.  Implement the guts as a specialization of server.py.

### Queue-Based Solution
Files queue_consumer.py and queue_produced.py implement a message
queue solution, using Open Source RabbitMQ.  This solution requires
installation of an Erlang environment, and then the RabbitMQ
service.  This solution will be quite performant and less fussy.

To demonstrate the RabbitMQ solution:
*   Install Erlang and RabbitMQ (see below).
*   Install the pika Python module:
    *   pip install pika
*   Start a shell and run queue_consumer.py
*   Start N instances of queue_producer.py.  Enter a message as
a command line argument to queue_prducer.py.  The message will be
put into a queue instance by the producer, and will be pulled out
of the queue by queue_consumer.py.

## RabbitMQ
RabbitMQ is a cross-platform Advanced Message Queue Protocol (AMQP)
implementation.  It runs as a service.  Unrelated processes can put
messages into the queue and pull messages out of the queue.  It is
a fantastic decoupler.

In this approach, no threads in your code are required.  Your
code simply implements a callback function that is invoked when
a message arrives at the consumer.  If you want, the callback
function _could_ launch a thread to handle the message.  See
server.py for an example of how to do this.

The RabbitMQ [web site](https://www.rabbitmq.com/) contains all
you need to know to install.  I discovered these quirks during
installation on Windows 10:
1.  When you install Erlang:
    1.  Right click on the downloaded installer and click
    'Run as Administrator'.
    1.  Do not install it under the default location C:\Program Files.
    It seems the ERLANG_HOME environment variable does not like the
    space in 'Program Files'.  I installed Erlang in C:\Erlang, and my
    ERLANG_HOME environment variable value is C:\Erlang\erl9.1.

1.  When you install RabbitMQ:
    1.  Right click on the downloaded installer and click
    'Run as Administrator'.

## Recommended Resources
*   'Python in a Nutshell' by Alex Martelli
*   'RabbitMQ in Action' by Alvaro Videla and Jason Williams
*   'Learning Python Network Programming' by Dr. M. O. Faruque
Sarker and Sam Washington

