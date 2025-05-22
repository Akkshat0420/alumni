from multiprocessing import Process
import os
# Function to calculate and print squares
def calculate_squares(numbers):
    for num in numbers:
        square = num * num
        print(
            f"Square of the number {num} is {square} | PID of the process {os.getpid()}")

if __name__ == "__main__":
    numbers = [1, 2, 3, 4, 5, 6, 7, 8]
    half = len(numbers) // 2
    first_half = numbers[:half]
    second_half = numbers[half:]

    p1 = Process(target=calculate_squares, args=(first_half,))
    p2 = Process(target=calculate_squares, args=(second_half,))

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    print("Done calculating squares.")
    print(p1.name)