import sys

if __name__ == "__main__":

    # First arg i.e. sys.argv[0] is the file location e.g. py-files\login.py
    d = {}

    for x in range(0, len(sys.argv)):
        d["value{0}".format(x)] = sys.argv[x]

    # print(d)

    '''
    This approach causes error in IDE
    for i in range(0, len(sys.argv)):
        globals()[f"var{i}"] = sys.argv[i]        
    
    print('================'+var1)
    print('================'+var2)
    '''


    print('First Arg in Python - ' + d["value0"])
    print('Second Arg in Python - ' + d["value1"])
    print('Third Arg in Python 2 - ' + d["value2"])



