GO

/****** Object:  Table [dbo].[MXP]    Script Date: 2/13/2021 9:25:54 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Duracio] [time](7) NOT NULL,
	[Final] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[MXPTotals] [smallint] NOT NULL,
 CONSTRAINT [PK_MXP] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
