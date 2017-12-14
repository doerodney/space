"""
A simple TCP client application that transmits a user-specified message.
Citation:  'Learning Python Network Programming', Dr. M. O. Faruque Sarker and Sam Washington
"""
import sys
import socket
import protocol

HOST = sys.argv[-1] if len(sys.argv) > 1 else '127.0.0.1'
PORT = protocol.PORT


def main():
    """
    The main loop prompts a user to specify a message
    :return: None
    """
    while True:
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.connect((HOST, PORT))
            # print('\nConnected to {}:{}'.format(HOST, PORT))
            print("Type message, enter to send, 'q' to quit")
            msg = input()
            if msg == 'q':
                break

            protocol.send_msg(sock, msg)
            # print('Sent message: {}'.format(msg))

        except ConnectionError:
            print('Socket error')
            break

        finally:
            sock.close()
            # print('Closed connection to server\n')


if __name__ == '__main__':
    main()
