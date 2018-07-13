# Forma Utilities
- [argsenv](#argsenv)
- [cleanEmpty](#cleanEmpty)
- [cleanNull](#cleanNull)
- [cleanundefined](#cleanundefined)
- [combine](#combine)
- [deepClean](#deepClean)
- [difference](#difference)
- [functionArguments](#functionArguments)
- [guid](#guid)
- [isEmptyObject](#isEmptyObject)
- [jString](#jString)
- [mongo](#mongo)
    - [rangeQueryInclusive](#rangeQueryInclusive)
    - [rangeQueryExclusive](#rangeQueryExclusive)
    - [likeTrimIgnoreCaseQuery](#likeTrimIgnoreCaseQuery)
    - [dateRangeQueryExclusive](#dateRangeQueryExclusive)
    - [dateRangeQueryInclusive](#dateRangeQueryInclusive)
- [stringFormat](#stringFormat)
- [stringRender](#stringRender)
- [stripDash](#stripDash)
- [url](#url)

# argsenv
Set the current process environment settings to values fulfilling format of ```key=value``` 

Usage: ```argsenv()```

# cleanEmpty
Remove the keys inside of object when the value is ```null``` or ```undefined```

Usage: ```cleanEmpty(obj)```

# cleanNull
Remove the keys inside of object when the value is ```null```

Usage: ```cleanNull(obj)```

# cleanUndefined
Remove the keys inside of object when the value is ```undefined```

Usage: ```cleanUndefined(obj)```

# combine
(no info)

# deepClean
recursive [cleanEmpty](#clean-empty)

usage: ```deepClean(obj)```

# difference
(no info)

# functionArguments
returning the parameter names of a function

usage: ```functionArguments(func)```

example:
```
function test(a1,asdf,xyz){}

functionArguments(test) // ["a1","asdf","xyz"]

```

# guid
generating a random GUID in form of xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx

#