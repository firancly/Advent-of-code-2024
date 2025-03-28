local https = require("ssl.https")
local ltn12 = require("ltn12")

local url = "https://adventofcode.com/2024/day/1/input"
local response = {}
local _, status = https.request{
    url = url,
    sink = ltn12.sink.table(response),
    headers = {
        ["Cookie"] = "session=53616c7465645f5f13e0878049c2837a8600b03df76f7c0d12ebdfca1418ad9c85e423c4723b5ea0ac68e33b0c6401093c30e51fde2123d00e7445ab889b9b24"
    }
}

if status ~= 200 then
    error("Failed to fetch data from the URL. Status code: " .. status)
end

response = table.concat(response)

local first = {}
local second = {}
local total = 0

for line in response:gmatch("[^\n]+") do
    local left, right = line:match("(%d+)%s%s%s(%d+)")
    if left and right then
        table.insert(first, tonumber(left))
        table.insert(second, tonumber(right))
    end
end

while #first > 0 do
    local lowestOne = math.huge
    local lowestOneIndex = nil
    for i, v in ipairs(first) do
        if v < lowestOne then
            lowestOne = v
            lowestOneIndex = i
        end
    end

    local lowestTwo = math.huge
    local lowestTwoIndex = nil
    for i, v in ipairs(second) do
        if v < lowestTwo then
            lowestTwo = v
            lowestTwoIndex = i
        end
    end

    total = total + math.abs(lowestOne - lowestTwo)

    table.remove(first, lowestOneIndex)
    table.remove(second, lowestTwoIndex)
end

print(total)