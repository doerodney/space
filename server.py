"""
Implements a multi-threaded TCP server that listens for messages then prints them.
Citation:  'Learning Python Network Programming', Dr. M. O. Faruque Sarker and Sam Washington
"""
import threading
import protocol

HOST = protocol.HOST
PORT = protocol.PORT


def handle_client(sock, addr):
    """
    Receives a message from a client.
    Implemented as a thread function.
    :param sock:
    :param addr:
    :return: None
    """
    try:
        msg = protocol.recv_msg(sock)
        print('{}: {}'.format(addr, msg))
    except (ConnectionError, BrokenPipeError):
        print('Socket error')
    finally:
        # print('Closed connection to {}'.format(addr))
        sock.close()


def main():
    """
    Main loop that listens for incoming messages.
    When an inbound message is detected, creates a thread
    to process the incoming message.
    :return:
    """
    listen_sock = protocol.create_listen_socket(HOST, PORT)
    addr = listen_sock.getsockname()
    print('Listening on {}'.format(addr))

    while True:
        # socket.accept() blocks until a client attempts connection.
        client_sock, addr = listen_sock.accept()
        # Create and start a thread to handle incoming message.
        thread = threading.Thread(target=handle_client,
                                  args=[client_sock, addr],
                                  daemon=True)
        thread.start()
        # print('Connection from {}'.format(addr))


if __name__ == '__main__':
    main()
