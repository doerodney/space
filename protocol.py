"""
Implements simple protocol helper functions.
Citation:  'Learning Python Network Programming', Dr. M. O. Faruque Sarker and Sam Washington
"""
import socket

HOST = ''
PORT = 4040

def create_listen_socket(host, port):
    """
    Setup the sockets the on which the server will receive requests.
    :param host:
    :param port:
    :return:
    """
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((host, port))
    sock.listen(100)
    return sock

def recv_msg(sock):
    """
    Wait for data to arrive in the socket, then parse into messages
    using b'\0' as a message delimiter.
    :param sock:
    :return:
    """
    data = bytearray()
    msg = ''

    # Read 4096 bytes off the socket, storing the bytes in data until
    # the delimiter is found.
    while not msg:
        recvd = sock.recv(4096)
        if not recvd:
            # Socket has been closed.
            raise ConnectionError()

        data = data + recvd
        if b'\0' in recvd:
            msg = data.rstrip(b'\0')
    msg = msg.decode('utf-8')
    return msg


def prep_msg(msg):
    """
    Prepares a message for it to be sent.
    :param msg:
    :return:
    """
    msg += '\0'
    return msg.encode('utf-8')


def send_msg(sock, msg):
    """
    Sends a message.
    :param sock:
    :param msg:
    :return:
    """
    data = prep_msg(msg)
    sock.sendall(data)
