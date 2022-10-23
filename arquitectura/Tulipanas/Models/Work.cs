﻿using System;

namespace Tulipanas.Models
{
    public class Work
    {
        private int? id;
        private string audioPath;
        private string csvPath;
        private DateTime? creationTime;
        private DateTime? completionTime;

        public Work()
        {
        }

        public Work(int? id, string audioPath, string csvPath, DateTime? creationTime, DateTime? completionTime)
        {
            this.id = id;
            this.audioPath = audioPath;
            this.csvPath = csvPath;
            this.creationTime = creationTime;
            this.completionTime = completionTime;
        }

        public int? Id { get => id; set => id = value; }
        public string AudioPath { get => audioPath; set => audioPath = value; }
        public string CsvPath { get => csvPath; set => csvPath = value; }
        public DateTime? CreationTime { get => creationTime; set => creationTime = value; }
        public DateTime? CompletionTime { get => completionTime; set => completionTime = value; }
    }
}