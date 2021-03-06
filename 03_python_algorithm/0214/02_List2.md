[toc]

# 02_List2

## 배열: 2차원 배열

* 1차원 List를 묶어놓은 List
* 2차원 이상의 다차원 List는 차원에 따라 index를 선언
* 2차원 리스트의 선언: 세로길이(행의 개수), 가로길이(열의 개수)를 필요로 함
* Python에서는 데이터 초기화를 통해 변수선언과 초기화가 가능함



### 배열 순회

N x M 배열의 N*M개의 모든 원소를 빠짐없이 조사하는 방법



* 행 우선 순회
  * i행의 좌표 & j열의 좌표

```python
for i in range(N):
    for j in range(M):
        arr[i][j]
```

<img src="02_List2.assets/image-20220220174343849.png" alt="image-20220220174343849" style="zoom:80%;" />



* 열 우선 순회
  * i행의 좌표 & j열의 좌표

```python
for j in range(N):
    for i in range(M):
        arr[i][j]
```

<img src="02_List2.assets/image-20220220174714890.png" alt="image-20220220174714890" style="zoom:80%;" />

* 지그재그 순회
  * i행의 좌표 & j열의 좌표

```python
# 1.
for i in range(N):
    for j in range(M):
        arr[i][j + (m-1-2*j) * (i%2)]

# 2. 짝수행과 홀수행을 나눠서 생각한다.        
for i in range(N):
    if i%2 == 1:
        for j in range(M-1, -1, -1):
            arr[i][j]
    if i%2 == 0:
        for j in range(M):
            arr[i][j]
```



![image-20220220174734064](02_List2.assets/image-20220220174734064.png)



* 크기만 정해져있고, 비어있는 2차원 배열은 어떻게 만들수 있는가?

```python
arr = [[0]*3]*4
arr[0][1] = 1
print(arr)
```

<img src="02_List2.assets/image-20220220174536211.png" alt="image-20220220174536211" style="zoom:50%;" />

이렇게 나온다

why? <img src="02_List2.assets/image-20220220175342879.png" alt="image-20220220175342879" style="zoom:50%;" />왼쪽처럼 참조하는 형태이기 때문

```python
arr = [[0]*3 for _ in range(4)] 
```

위 코드를 사용한다.



* 0으로 좌상이 둘러싸게

![image-20220220175627063](02_List2.assets/image-20220220175627063.png)

* 0으로 사방면 둘러싸게

![image-20220220175656434](02_List2.assets/image-20220220175656434.png)



### 델타를 이용한 2차 배열 탐색

2차 배열의 한 좌표에서 네 방향의 인접 배열 요소를 탐색하는 방법

```python
for i in range(N):
    for j in range(M):
		for di, dj in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
    		ni = i + di
    		nj = j + di
    		if 0<=ni<N and 0<=n<M:
        		arr[ni][nj]
```



### 전치행렬

```python
for i in range(N):
    for j in range(N):
        if j < j:
            arr[i][j], arr[j][i] = arr[j][i], arr[i][j]
```

```python
arr = list(map(list, zip(*arr)))
```

> `zip()`:  `zip(*iterable)`은 동일한 개수로 이루어진 자료형을 묶어 주는 역할을 하는 함수이다.
>
> ※ 여기서 사용한 `*iterable`은 반복 가능(iterable)한 자료형 여러 개를 입력할 수 있다는 의미이다.

```python
>>> list(zip([1, 2, 3], [4, 5, 6]))
[(1, 4), (2, 5), (3, 6)]
>>> list(zip([1, 2, 3], [4, 5, 6], [7, 8, 9])) # 이 예시가 전치행렬에 쓰임!
[(1, 4, 7), (2, 5, 8), (3, 6, 9)]
>>> list(zip("abc", "def"))
[('a', 'd'), ('b', 'e'), ('c', 'f')]
```



## 부분집합 생성

* 유한개의 정수로 이루어진 집합이 있을 때, 이 집합의 부분집합 중에서 그 집합의 원소를 모두 더한 값이 0이 되는 경우가 있는지를 알아내는 문제
  * 완전 검색으로 푼다면, 집합의 모든 부분집합을 생성한 후에 각 부분집합의 합을 계산해야 한다.



### bit가 0 or 1로 나타난다면, 부분집합이 어떻게 나타나는가?

```python
# bit의 조합이 출력된다.
bit = [0]*4

for i in range(2):
    bit[0] = i
    for j in range(2):
        bit[1] = j
        for k in range(2):
            bit[2] = k
            for l in range(2):
                bit[3] = l
                print(bit)
```

```python
# arr의 부분집합이 출력된다.
arr = [1, 2, 3, 4]
bit = [0]*4

for i in range(2):
    bit[0] = i
    for j in range(2):
        bit[1] = j
        for k in range(2):
            bit[2] = k
            for l in range(2):
                bit[3] = l
                for m in range(4):
                    if bit[m]:
                        print(arr[m], end=' ')
                print()
```



### 비트 연산자

메모리의 상태를 구분할 수 있는 단위 == `bit` / 8-bit == 1 byte

* `&`: 비트 단위로 AND 연산
* `|`: 비트 단위로 OR 연산
* `<<`: 피연산자의 비트 열을 왼쪽으로 이동시킨다.
* `>>`: 피연산자의 비트 열을 오른쪽으로 이동시킨다.



* `<<` 연산자
  * `1 << n` == `2^n`, 원소가 n개일 경우의 모든 부분집합의 수를 의미한다.
    n번 비트가 1인 값
    * 예시
      <img src="02_List2.assets/image-20220220182243829.png" alt="image-20220220182243829" style="zoom:33%;" />
* `&` 연산자
  * `i & (1<<j)`: i의 j번째 비트가 1인지 아닌지를 검사한다.
    * 예시: i = 9이면, 111(2)가 되는데, 이때 1<<2를 하면 100(2)이 된다.
      이 둘을 AND 연산을 한다면 100이 나올 것이고, 이는 결국 i에서 j번째 비트가 1인지를 확인하는 것이랑 같다.



### 비트 연산자를 이용한 부분집합 생성

```python
arr = [1, 2, 3]

n = len(arr)
result = []

for i in range(1<<n):
    subset = []
    for j in range(n):
        if i & (1<<j):
            subset.append(arr[j])
    result.append(subset)
print(result)
```

```python
[[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

> 모듈 사용하는 방법

```python
from itertools import combinations 

arr = [1, 2, 3]
result = []
for i in range(len(arr)+1):
  result = result+list(combinations(arr,i))  

print(result)
# [(), (1,), (2,), (3,), (1, 2), (1, 3), (2, 3), (1, 2, 3)]
```



## 검색

- 저장되어 있는 자료 중에서 원하는 항목을 찾는 작업
- 목적하는 탐색 키를 가진 항목을 찾는 것
  - 탐색 키: 자료를 구별하여 인식할 수 있는 키
- 검색의 종류
  - 순차 검색(sequential search)
  - 이진 검색(binary search)
  - 해쉬(hash)



### 순차검색

일렬로 되어 있는 자료를 순서대로 검색하는 방법

* 가장 간단하고 직관적인 검색 방법
* 배열이나 연결 리스트 등 순차구조로 구현된 자료구조에서 원하는 항목을 찾을 때 유용함
* 알고리즘이 단순하여 구현이 쉽지만, 검색 대상의 수가 많은 경우에는 수행시간이 급격히 증가하여 비효율적임

* 2가지 경우가 존재한다.
  * 정렬되어 있는 경우
  * 정렬되어 있지 않은 경우



#### 정렬되어 있지 않은 경우

##### 검색 과정

첫번째 원소부터 순서대로 검색 대상과 키 값이 같은 원소가 있는지 비교하며 찾는다.

키 값이 동일한 원소를 찾으면 그 원소의 인덱스를 반환한다.

자료구조의 마지막에 이를 때까지 검색 대상을 찾지 못하면 검색 실패



찾고자 하는 원소의 순서에 따라 비교 횟수가 결정된다.

* 첫번째 원소를 찾을 때는 1번 비교, 두번째 원소를 찾을 때는 2번 비교
* 정렬돼 있지 않은 자료에서의 평균 비교 회수 = (n+1)/2
* 시간 복잡도: O(n)



#### 정렬되어 있는 경우

##### 검색 과정

자료가 오름차순으로 정렬된 상태에서 검색을 실시한다면,

자료를 순차적으로 검색하면서 키 값을 비교하여, 원소의 키 값이 검색 대상의 키 값보다 크면 찾는 원소가 없다는 것이므로 더 이상 검색하지 않고 검색을 종료한다. 



찾고자 하는 원소의 순서에 따라 비교회수가 결정된다.

* 정렬이 되어 있으므로, 검색 실패를 반환하는 경우 평균 비교 횟수가 반으로 줄어든다.
* 시간 복잡도: O(n)



## 바이너리 서치(Binary Search)

자료의 가운데에 있는 항목의 키 값과 비교하여 다음 검색의 위치를 결정하고 검색을 계속 진행하는 방법

목적 키를 찾을 떄까지 이진 검색을 순환적으로 반복 수행함으로써 검색 범위를 반으로 줄여가면서 보다 빠르게 검색을 수행한다.

이진 검색을 하기 위해서는 자료가 정렬된 상태여야 한다!!!!

* 시간 복잡도: O(logn)



### 검색 과정

자료의 중앙에 있는 원소를 고른다.

중앙 원소의 값과 찾고자 하는 목표값을 비교한다.

목표값이 중앙 원소의 값보다 작으면 자료의 왼쪽 반에 대해서 새로 검색을 수행하고, 크다면 자료의 오른쪽 반에 대해서 검색을 수행한다.

찾고자 하는 값을 찾을 때까지 위의 과정을 반복한다.



### 구현

검색 범위의 시작점과 종료점을 이용하여 검색을 반복 수행한다.

이진 검색의 경우, 자료에 삽입이나 삭제가 발생했을 때 배열의 상태를 항상 정렬 상태로 유지하는 추가 작업이 필요하다.

```python
# start, end, middle은 모두 idx값이다!!!
def binary(arr, N, key):
    start = 0
    end = N-1
    while start <= end:
        middle = (start+end)//2
        if arr[middle] == key:
            return True
        elif arr[middle] > key:
            end = middle - 1
        else:
            start = middle +1
    return False
```

#### 재귀함수 사용

```python
def binary_s(arr, start, end, key):
    if end < start:					# 검색 실패
        return False
    else: 
        middle = (start + end) // 2
        if key == arr[middle]:		# 검색 성공
            return True
        elif key < arr[middle]:
            return binary_s(arr, start, middle-1, key)
        elif arr[middle] < key:
            return binary_s(arr, middle+1, end, key)
```



## 인덱스(우선은 넘어간다.)

* database에서 유래했으며, 테이블에 대한 동작 속도를 높여주는 자료 구조를 일컫는다. database 분야가 아닌 곳에서는 look up table 등의 용어를 사용하기도 한다.
* 인덱스를 저장하는데 필요한 디스크 공간은 보통 테이블을 저장하는데 필요한 디스크 공간보다 작다. 왜냐하면 보통 인덱스는 키-필드만 갖고 있고, 테이블의 다른 세부 항목들은 갖고 있지 않기 때문이다.
* 배열을 사용한 인덱스: 다량의 데이터를 매번 정렬하면, 프로그램의 반응은 느려질 수 밖에 없다. 이러한 대량 데이터의 성능 저하 문제를 해결하기 위해 배열 인덱스를 사용할 수 있다.



### 포켓볼 순서대로 정렬하기



## 선택 정렬(Selection Sort)

주어진 자료들 중 가장 작은 값의 원소부터 차례대로 선택하여 위치를 교환하는 방식. 앞서 살펴본 셀렉션 알고리즘을 전체 자료에 적용한 것이다.



* 정렬과정

  * 주어진 리스트 중에서 최솟값을 찾는다.

  * 그 값을 리스트의 맨 앞에 위치한 값과 교환한다.

  * 맨 처음 위치를 제외한 나머지 리스트를 대상으로 위의 과정을 반복한다.



* 시간 복잡도
  * O(n^2): 보통 이중 for문을 돌면 이렇게 된다.



### 정렬 과정

1. 주어진 리스트에서 최솟값을 찾고, 리스트의 맨 앞에 위치한 값과 교환한다.
2. 맨 앞을 제외한 미정렬 리스트에서 최솟값을 찾고, 미정렬 리스트의 맨 앞에 위치한 값과 교환한다.

미정렬 원소가 하나 남은 상황에서는 마지막 원소가 가장 큰 값을 갖게 되므로, 실행을 종료하고 선택 정렬이 완료된다.

```python
def selection(arr, N):
    # 기준! 맨 뒤에서 앞에 있는 요소까지 가는 것이기 때문에, N-1로 한다.
    for i in range(N-1):
        minidx = i
        # 최솟값의 인덱스를 찾으로 가는 여정
        for j in range(i+1, N):
            if arr[minidx] > a[j]:
                minidx = j
        a[i], a[minidx] = a[minidx], a[i]
```



## 셀렉션 알고리즘(Selection Algorithm)

저장되어 있는 자료로부터 k번재로 큰 혹은 작은 원소를 찾는 방법 (최솟값, 최댓값 혹은 중간값을 찾는 알고리즘을 의미하기도 한다.)



* 선택 과정:
  1. 정렬 알고리즘을 이용하여 자료 정렬하기
  2. 원하는 순서에 있는 원소 가져오기



### 예시: k번재로 작은 원소를 찾는 알고리즘

1번부터 k번째까지 작은 원소들을 찾아 배열의 앞쪽으로 이동시키고, 배열의 k번째를 반환한다.

k가 비교적 작을 때 유용하며, O(kn)의 수행시간을 필요로 한다.

```python
def select(arr, N):
    # k번째로 작은애를 찾는 것이기 때문에, k-1을 인덱스로 하는 애까지 기준으로 가져간다.
    for i in range(k):
        minidx = i
        # 최솟값의 인덱스를 찾으로 가는 여정
        for j in range(i+1, len(arr)):
            if arr[minidx] > a[j]:
                minidx = j
        a[i], a[minidx] = a[minidx], a[i]
    return arr[k-1]
```



<img src="02_List2.assets/image-20220220211046445.png" alt="image-20220220211046445" style="zoom:80%;" />